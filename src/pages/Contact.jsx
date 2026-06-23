import { useState, useEffect } from "react"

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [timeLeft, setTimeLeft] = useState(null)
  const [timerActive, setTimerActive] = useState(false)

  // List of disposable email domains and blocked keywords
  const DISPOSABLE_EMAIL_DOMAINS = [
    'yopmail.com', 'mailinator.com', 'tempmail.com', 'guerrillamail.com',
    '10minutemail.com', 'trashmail.com', 'fakeinbox.com', 'temp-mail.org', 'test.com', 'admin.com',
    'example.com', 'demo.com', 'fakemail.com', 'maildrop.cc', 'getnada.com', 'throwawaymail.com',
    'mytemp.email', 'mailnesia.com', 'spambox.us', 'spamgourmet.com', 'spambog.com', 'spambox.me', 'mailcatch.com', 'temp-mail.io', 'mail-temp.com'
  ]
  
  const BLOCKED_KEYWORDS = ['test', 'admin', 'temp', 'example', 'demo', 'fake']

  // Check for existing timer on component mount
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    const storedTimer = localStorage.getItem('contactFormTimer')
    if (storedTimer) {
      const remainingTime = calculateRemainingTime(storedTimer)
      if (remainingTime > 0) {
        setTimerActive(true)
        setTimeLeft(remainingTime)
        startCountdown(remainingTime)
      } else {
        localStorage.removeItem('contactFormTimer')
      }
    }
  }, [])

  const calculateRemainingTime = (storedTime) => {
    const now = new Date().getTime()
    const endTime = parseInt(storedTime, 10)
    return Math.max(0, Math.floor((endTime - now) / 1000))
  }

  const startCountdown = (initialTime) => {
    let time = initialTime
    const timer = setInterval(() => {
      time -= 1
      setTimeLeft(time)
      
      if (time <= 0) {
        clearInterval(timer)
        setTimerActive(false)
        localStorage.removeItem('contactFormTimer')
      }
    }, 1000)
    
    return () => clearInterval(timer)
  }

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const validateForm = () => {
    const newErrors = {}
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    } else {
      const domain = formData.email.split('@')[1].toLowerCase()
      if (DISPOSABLE_EMAIL_DOMAINS.includes(domain)) {
        newErrors.email = 'Disposable email addresses are not allowed'
      }
    }
    
    // Company validation
    if (formData.company.trim()) {
      const companyLower = formData.company.toLowerCase()
      if (BLOCKED_KEYWORDS.some(keyword => companyLower.includes(keyword))) {
        newErrors.company = 'Please provide a valid company name'
      }
    }
    
    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    }
    
    // Timer validation
    if (timerActive) {
      newErrors.form = `Please wait ${formatTime(timeLeft)} before submitting another message.`
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)
    setSubmitSuccess(false)

    try {
      const scriptURL = 'https://script.google.com/macros/s/AKfycbxPingtSPIPmWQnzicm3MTKNEKJkAcxbY3z-ytPYm15319ZP1pAu_kh_5YvqG35CxoP/exec'
      
      const formDataEncoded = new URLSearchParams()
      for (const key in formData) {
        formDataEncoded.append(key, formData[key])
      }

      const response = await fetch(scriptURL, {
        method: 'POST',
        body: formDataEncoded,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })

      const result = await response.json()

      if (result.result === 'success') {
        setSubmitSuccess(true)
        setFormData({ name: "", email: "", company: "", message: "" })
        
        // Set timer in localStorage for 1 hour
        const now = new Date()
        const oneHourLater = now.getTime() + 60 * 60 * 1000 // 1 hour in milliseconds
        localStorage.setItem('contactFormTimer', oneHourLater.toString())
        setTimerActive(true)
        setTimeLeft(3600) // 1 hour in seconds
        startCountdown(3600)
      } else {
        throw new Error(result.error || "Failed to send message")
      }
    } catch (error) {
      console.error('Submission error:', error)
      setErrors(prev => ({
        ...prev,
        form: `Error: ${error.message}. Please try again or contact us directly.`
      }))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-32 md:py-40 bg-[#f8f8f6] text-[#0f0f0f] mt-16 border-t border-slate-200 font-sans">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-20 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#00a859] block">
            Let's Connect
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#0f0f0f] font-heading">
            Contact Us
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl leading-relaxed">
            Have a question or want to work with us? We'd love to hear from you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left - Contact Info */}
          <div className="space-y-12">
            <h3 className="text-xl font-bold uppercase tracking-wider text-[#0f0f0f] border-b border-slate-200 pb-4">
              Contact Information
            </h3>

            <div className="space-y-8">
              <div className="flex items-start gap-5">
                <div className="text-[#0b4a93] mt-1">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-1">Email</p>
                  <p className="text-base text-[#0f0f0f] font-mono font-medium">professionaledgeglobal@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="text-[#0b4a93] mt-1">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.387a12.035 12.035 0 01-7.108-7.108c-.155-.44.01-1.21.387-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-1">Phone</p>
                  <p className="text-base text-[#0f0f0f] font-mono font-medium">+977 (98) 61171768</p>
                  <p className="text-base text-[#0f0f0f] font-mono font-medium">+977 (98) 51135421</p>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="text-[#0b4a93] mt-1">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-1">Address</p>
                  <p className="text-base text-[#0f0f0f] font-medium leading-relaxed">
                    Tinkune, Kathmandu <br />
                    Nepal
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {submitSuccess && (
              <div className="p-4 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg text-sm font-semibold">
                Thank you for your message! We'll get back to you soon.
                {timerActive && (
                  <div className="mt-2 text-xs font-mono font-normal">
                    You can submit another message in: {formatTime(timeLeft)}
                  </div>
                )}
              </div>
            )}
            
            {errors.form && (
              <div className="p-4 bg-red-50 text-red-800 border border-red-200 rounded-lg text-sm">
                {errors.form}
              </div>
            )}
            
            <div className="space-y-2">
              <label htmlFor="name" className="block text-xs font-bold text-[#0f0f0f] mb-1 uppercase tracking-widest">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-1 ${errors.name ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-slate-200 focus:ring-[#0b4a93] focus:border-[#0b4a93]'} bg-white text-sm text-[#0f0f0f] transition-all`}
                required
              />
              {errors.name && <p className="mt-1 text-xs text-red-500 font-medium">{errors.name}</p>}
            </div>
            
            <div className="space-y-2">
              <label htmlFor="email" className="block text-xs font-bold text-[#0f0f0f] mb-1 uppercase tracking-widest">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-1 ${errors.email ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-slate-200 focus:ring-[#0b4a93] focus:border-[#0b4a93]'} bg-white text-sm text-[#0f0f0f] transition-all`}
                required
              />
              {errors.email && <p className="mt-1 text-xs text-red-500 font-medium">{errors.email}</p>}
            </div>
            
            <div className="space-y-2">
              <label htmlFor="company" className="block text-xs font-bold text-[#0f0f0f] mb-1 uppercase tracking-widest">
                Company
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-1 ${errors.company ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-slate-200 focus:ring-[#0b4a93] focus:border-[#0b4a93]'} bg-white text-sm text-[#0f0f0f] transition-all`}
              />
              {errors.company && <p className="mt-1 text-xs text-red-500 font-medium">{errors.company}</p>}
            </div>
            
            <div className="space-y-2">
              <label htmlFor="message" className="block text-xs font-bold text-[#0f0f0f] mb-1 uppercase tracking-widest">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-1 ${errors.message ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-slate-200 focus:ring-[#0b4a93] focus:border-[#0b4a93]'} bg-white text-sm text-[#0f0f0f] transition-all`}
                required
              ></textarea>
              {errors.message && <p className="mt-1 text-xs text-red-500 font-medium">{errors.message}</p>}
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting || timerActive}
              className={`w-full bg-[#0b4a93] text-white px-8 py-3.5 rounded-lg font-bold uppercase tracking-widest hover:bg-[#00a859] transition-colors duration-300 text-xs ${
                isSubmitting || timerActive ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Sending...' : timerActive ? `Wait ${formatTime(timeLeft)}` : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact