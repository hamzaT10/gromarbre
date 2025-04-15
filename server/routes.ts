import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { contactFormSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes for contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate the contact form data
      const contactData = contactFormSchema.parse(req.body);
      
      // Store the contact form submission
      const result = await storage.saveContactForm(contactData);
      
      // Return success response
      res.status(200).json({ 
        success: true, 
        message: "Contact form submitted successfully",
        id: result.id
      });
    } catch (error) {
      if (error instanceof ZodError) {
        // Handle validation errors
        const validationError = fromZodError(error);
        res.status(400).json({ 
          success: false, 
          message: "Validation error", 
          errors: validationError.message
        });
      } else {
        // Handle other errors
        console.error("Error submitting contact form:", error);
        res.status(500).json({ 
          success: false, 
          message: "An error occurred while submitting the form"
        });
      }
    }
  });

  // API route to get contact form submissions (for admin purposes)
  app.get("/api/contact", async (req, res) => {
    try {
      const contactForms = await storage.getContactForms();
      res.status(200).json(contactForms);
    } catch (error) {
      console.error("Error fetching contact forms:", error);
      res.status(500).json({ 
        success: false, 
        message: "An error occurred while fetching contact form submissions"
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
