"use client"

import { useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Send, CheckCircle, AlertCircle } from 'lucide-react'
import { validateContactForm } from "./actions"
import emailjs from "@emailjs/browser"

export default function ContactForm() {
  const [isPending, startTransition] = useTransition()
  const [result, setResult] = useState<{
    success: boolean
    message: string
    errors?: Record<string, string>
  } | null>(null)

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      try {
        // First validate the form data
        const validation = await validateContactForm(formData)

        if (!validation.success) {
          setResult(validation)
          return
        }

        // Send email using EmailJS
        const templateParams = {
          from_name: validation.data.name,
          from_email: validation.data.email,
          subject: validation.data.subject,
          message: validation.data.message,
          to_email: "uddin.rajaul1@gmail.com",
        }

        const response = await emailjs.send(
          "connect-with-me", // Service ID
          "template_xj11l58", // Template ID
          templateParams,
          "49kzRYSVDrK5eSEWZ", // Public Key
        )

        if (response.status === 200) {
          setResult({
            success: true,
            message: "Thank you for your message! I'll get back to you soon.",
          })

          // Clear form if successful
          const form = document.getElementById("contact-form") as HTMLFormElement
          form?.reset()
        } else {
          throw new Error("Failed to send email")
        }
      } catch (error) {
        console.error("Email sending error:", error)
        setResult({
          success: false,
          message: "Failed to send message. Please try again or contact me directly at uddin.rajaul1@gmail.com",
        })
      }
    })
  }

  return (
    <form id="contact-form" action={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors"
        >
          Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          disabled={isPending}
          className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-purple-500 dark:focus:border-purple-400 transition-colors disabled:opacity-50"
          placeholder="Your name"
        />
        {result?.errors?.name && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{result.errors.name}</p>}
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors"
        >
          Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          disabled={isPending}
          className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-purple-500 dark:focus:border-purple-400 transition-colors disabled:opacity-50"
          placeholder="your.email@example.com"
        />
        {result?.errors?.email && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{result.errors.email}</p>}
      </div>

      <div>
        <label
          htmlFor="subject"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors"
        >
          Subject *
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          required
          disabled={isPending}
          className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-purple-500 dark:focus:border-purple-400 transition-colors disabled:opacity-50"
          placeholder="What's this about?"
        />
        {result?.errors?.subject && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{result.errors.subject}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors"
        >
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          disabled={isPending}
          className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-purple-500 dark:focus:border-purple-400 transition-colors resize-none disabled:opacity-50"
          placeholder="Tell me about your project, opportunity, or just say hello!"
        />
        {result?.errors?.message && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{result.errors.message}</p>
        )}
      </div>

      {/* Success/Error Message */}
      {result && (
        <div
          className={`p-4 rounded-md flex items-center gap-3 ${
            result.success
              ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
              : "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
          }`}
        >
          {result.success ? (
            <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
          )}
          <p
            className={`text-sm ${
              result.success ? "text-green-700 dark:text-green-300" : "text-red-700 dark:text-red-300"
            }`}
          >
            {result.message}
          </p>
        </div>
      )}

      <Button
        type="submit"
        disabled={isPending}
        className="w-full bg-purple-600 hover:bg-purple-700 dark:bg-purple-600 dark:hover:bg-purple-700 flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {isPending ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Send Message
          </>
        )}
      </Button>
    </form>
  )
}
