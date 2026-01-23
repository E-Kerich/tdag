import { useEffect, useState } from "react";
import { 
  Building, 
  User, 
  Globe, 
  Users, 
  Target, 
  Clock,
  Database,
  Zap,
  AlertCircle,
  CheckCircle,
  Send,
  StepForwardIcon
} from "lucide-react";
import api from "../../services/api";

const AIDiscoveryForm = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1
    businessName: "",
    email: "",
    nameAndRole: "",
    website: "",
    industry: "",
    companySize: "",
    
    // Step 2
    operationsAreas: [],
    frictionAreas: "",
    repetitiveTasks: "",
    
    // Step 3
    currentTools: [],
    dataStorage: [],
    usesAI: "",
    aiTools: "",
    
    // Step 4
    aiReasons: [],
    successDefinition: "",
    aiConcerns: [],
    
    // Step 5
    timeline: "",
    budget: "",
    
    // Step 6
    expectations: "",
    additionalInfo: "",
    
    // Step 7
    format: "",
    acknowledgement: false
  });

  const industries = [
    "Services",
    "Retail / eCommerce",
    "Education",
    "Healthcare",
    "Finance",
    "NGO / Non-profit",
    "Tech",
    "Other"
  ];

  const companySizes = [
    "Solo / Freelancer",
    "2–5 people",
    "6–20 people",
    "21–50 people",
    "50+"
  ];

  const operationsAreas = [
    "Sales",
    "Marketing",
    "Customer support",
    "Operations",
    "Finance / Admin",
    "Internal team coordination"
  ];

  const currentTools = [
    "Email (Gmail, Outlook, etc.)",
    "CRM",
    "WhatsApp / Chat tools",
    "Google Sheets / Excel",
    "Accounting tools",
    "Project management tools",
    "None / Mostly manual"
  ];

  const dataStorageOptions = [
    "Emails",
    "Spreadsheets",
    "Documents",
    "CRM",
    "Multiple places",
    "Not sure"
  ];

  const aiReasons = [
    "Save time",
    "Reduce costs",
    "Improve customer experience",
    "Support decision-making",
    "Competitor pressure",
    "Curiosity / exploration"
  ];

  const aiConcerns = [
    "Cost",
    "Complexity",
    "Data privacy",
    "Reliability",
    "Team adoption",
    "Not sure where to start"
  ];

  const budgets = [
    "Not sure yet",
    "Under KES 10,000",
    "KES 10,000 – 30,000",
    "KES 30,000+",
    "Depends on value"
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === "checkbox") {
      if (name.includes("[]")) {
        const field = name.replace("[]", "");
        const newArray = checked 
          ? [...formData[field], value]
          : formData[field].filter(item => item !== value);
        setFormData(prev => ({ ...prev, [field]: newArray }));
      } else {
        setFormData(prev => ({ ...prev, [name]: checked }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const nextStep = () => {
    setStep(prev => Math.min(prev + 1, 7));
  };

  const prevStep = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/ai-discovery", formData);
    alert("Your request has been submitted. We'll be in touch shortly.");
  };
  

  const isStepValid = () => {
    switch(step) {
      case 1:
        return formData.businessName && formData.nameAndRole && formData.industry && formData.companySize;
      case 2:
        return formData.operationsAreas.length > 0 && formData.frictionAreas && formData.repetitiveTasks;
      case 3:
        return formData.currentTools.length > 0 && formData.dataStorage.length > 0 && formData.usesAI;
      case 4:
        return formData.aiReasons.length > 0 && formData.successDefinition && formData.aiConcerns.length > 0;
      case 5:
        return formData.timeline && formData.budget;
      case 6:
        return formData.expectations;
      case 7:
        return formData.format && formData.acknowledgement;
      default:
        return false;
    }
  };

  const getStepIcon = (stepNum) => {
    const icons = [Building, User, Target, Database, Zap, AlertCircle, CheckCircle];
    return icons[stepNum - 1];
  };

  const StepIcon = getStepIcon(step);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full mb-6">
            
            <span className="text-sm font-medium">AI Discovery Intake Form</span>
          </div>
          
          <p className="text-gray-600 max-w-2xl mx-auto">
            This form helps us prepare properly for your AI Discovery Session.
            There are no right or wrong answers, clarity matters more than perfection.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                <StepForwardIcon className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Step {step} of 7</p>
                <h3 className="font-semibold text-gray-900">
                  {step === 1 && "Business Context"}
                  {step === 2 && "Current Operations"}
                  {step === 3 && "Data & Tools"}
                  {step === 4 && "AI Expectations"}
                  {step === 5 && "Readiness & Boundaries"}
                  {step === 6 && "Session Expectations"}
                  {step === 7 && "Confirmation"}
                </h3>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              {Math.round((step / 7) * 100)}% complete
            </div>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-emerald-500 rounded-full transition-all duration-300"
              style={{ width: `${(step / 7) * 100}%` }}
            />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Step 1 - Business Context */}
          {step === 1 && (
            <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 space-y-6">
              <div className="flex items-start gap-3 mb-6">
                <Building className="w-6 h-6 text-emerald-600 mt-1" />
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Step 1 — Business Context</h2>
                  <p className="text-gray-600 mt-1">Tell us about your business</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    1. Business Name *
                  </label>
                  <input
                    type="text"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    placeholder="Your company name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    1. Email Address*
                  </label>
                  <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your email address"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    2. Your Name & Role *
                  </label>
                  <input
                    type="text"
                    name="nameAndRole"
                    value={formData.nameAndRole}
                    onChange={handleChange}
                    placeholder="e.g. Founder, Operations Manager, Marketing Lead"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    3. Business Website (if any)
                  </label>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    placeholder="https://example.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    4. Industry *
                  </label>
                  <select
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select your industry</option>
                    {industries.map(industry => (
                      <option key={industry} value={industry}>{industry}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    5. Company Size *
                  </label>
                  <div className="space-y-2">
                    {companySizes.map(size => (
                      <label key={size} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input
                          type="radio"
                          name="companySize"
                          value={size}
                          checked={formData.companySize === size}
                          onChange={handleChange}
                          className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                          required
                        />
                        <span className="text-gray-700">{size}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2 - Current Operations */}
          {step === 2 && (
            <div className="bg-white rounded-2xl border p-6 md:p-8 space-y-6">
              <div className="flex items-start gap-3 mb-6">
                <Target className="w-6 h-6 text-emerald-600 mt-1" />
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Step 2 — How Your Business Operates Today</h2>
                  <p className="text-gray-600 mt-1">Help us understand your current workflow</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    6. Which areas best describe your current operations? *
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {operationsAreas.map(area => (
                      <label key={area} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input
                          type="checkbox"
                          name="operationsAreas[]"
                          value={area}
                          checked={formData.operationsAreas.includes(area)}
                          onChange={handleChange}
                          className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                        />
                        <span className="text-gray-700">{area}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    7. Where do you feel the most friction right now? *
                  </label>
                  <textarea
                    name="frictionAreas"
                    value={formData.frictionAreas}
                    onChange={handleChange}
                    placeholder="e.g. slow processes, too much manual work, missed follow-ups, unclear data"
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    8. Which tasks feel repetitive or time-consuming? *
                  </label>
                  <textarea
                    name="repetitiveTasks"
                    value={formData.repetitiveTasks}
                    onChange={handleChange}
                    placeholder="Describe repetitive tasks that take up significant time"
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    required
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    This helps us identify automation and AI opportunities.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Step 3 - Data & Tools */}
          {step === 3 && (
            <div className="bg-white rounded-2xl border p-6 md:p-8 space-y-6">
              <div className="flex items-start gap-3 mb-6">
                <Database className="w-6 h-6 text-emerald-600 mt-1" />
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Step 3 — Data & Tools You Already Use</h2>
                  <p className="text-gray-600 mt-1">Understanding your current tech stack</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    9. What tools are you currently using? *
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {currentTools.map(tool => (
                      <label key={tool} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input
                          type="checkbox"
                          name="currentTools[]"
                          value={tool}
                          checked={formData.currentTools.includes(tool)}
                          onChange={handleChange}
                          className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                        />
                        <span className="text-gray-700">{tool}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    10. Where is most of your business data stored? *
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {dataStorageOptions.map(option => (
                      <label key={option} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input
                          type="checkbox"
                          name="dataStorage[]"
                          value={option}
                          checked={formData.dataStorage.includes(option)}
                          onChange={handleChange}
                          className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                        />
                        <span className="text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    11. Do you currently use any AI tools? *
                  </label>
                  <div className="space-y-2">
                    {["Yes, regularly", "Yes, occasionally", "Tried but stopped", "No"].map(option => (
                      <label key={option} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input
                          type="radio"
                          name="usesAI"
                          value={option}
                          checked={formData.usesAI === option}
                          onChange={handleChange}
                          className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                          required
                        />
                        <span className="text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                  
                  {["Yes, regularly", "Yes, occasionally"].includes(formData.usesAI) && (
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Which ones? (optional)
                      </label>
                      <input
                        type="text"
                        name="aiTools"
                        value={formData.aiTools}
                        onChange={handleChange}
                        placeholder="e.g. ChatGPT, Midjourney, Jasper, etc."
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 4 - AI Expectations */}
          {step === 4 && (
            <div className="bg-white rounded-2xl border p-6 md:p-8 space-y-6">
              <div className="flex items-start gap-3 mb-6">
                <Zap className="w-6 h-6 text-emerald-600 mt-1" />
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Step 4 — Your AI Expectations (Real Talk)</h2>
                  <p className="text-gray-600 mt-1">What are you hoping to achieve?</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    12. What made you consider AI for your business? *
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {aiReasons.map(reason => (
                      <label key={reason} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input
                          type="checkbox"
                          name="aiReasons[]"
                          value={reason}
                          checked={formData.aiReasons.includes(reason)}
                          onChange={handleChange}
                          className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                        />
                        <span className="text-gray-700">{reason}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    13. What would "success" look like for you? *
                  </label>
                  <textarea
                    name="successDefinition"
                    value={formData.successDefinition}
                    onChange={handleChange}
                    placeholder="e.g. faster responses, fewer manual tasks, better insights"
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    14. What are your biggest concerns about AI? *
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {aiConcerns.map(concern => (
                      <label key={concern} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input
                          type="checkbox"
                          name="aiConcerns[]"
                          value={concern}
                          checked={formData.aiConcerns.includes(concern)}
                          onChange={handleChange}
                          className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                        />
                        <span className="text-gray-700">{concern}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 5 - Readiness & Boundaries */}
          {step === 5 && (
            <div className="bg-white rounded-2xl border p-6 md:p-8 space-y-6">
              <div className="flex items-start gap-3 mb-6">
                <AlertCircle className="w-6 h-6 text-emerald-600 mt-1" />
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Step 5 — Readiness & Boundaries</h2>
                  <p className="text-gray-600 mt-1">Practical considerations for implementation</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    15. Are you looking to implement AI immediately or explore first? *
                  </label>
                  <div className="space-y-2">
                    {["Explore only", "Ready to implement soon", "Unsure — need guidance"].map(option => (
                      <label key={option} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input
                          type="radio"
                          name="timeline"
                          value={option}
                          checked={formData.timeline === option}
                          onChange={handleChange}
                          className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                          required
                        />
                        <span className="text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    16. Do you have a monthly budget range in mind for AI tools & systems? *
                  </label>
                  <div className="space-y-2">
                    {budgets.map(budget => (
                      <label key={budget} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input
                          type="radio"
                          name="budget"
                          value={budget}
                          checked={formData.budget === budget}
                          onChange={handleChange}
                          className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                          required
                        />
                        <span className="text-gray-700">{budget}</span>
                      </label>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    This helps us recommend realistic solutions.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Step 6 - Session Expectations */}
          {step === 6 && (
            <div className="bg-white rounded-2xl border p-6 md:p-8 space-y-6">
              <div className="flex items-start gap-3 mb-6">
                <Clock className="w-6 h-6 text-emerald-600 mt-1" />
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Step 6 — Session Expectations</h2>
                  <p className="text-gray-600 mt-1">Help us deliver maximum value</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    17. What do you hope to walk away with after the Discovery Session? *
                  </label>
                  <textarea
                    name="expectations"
                    value={formData.expectations}
                    onChange={handleChange}
                    placeholder="e.g. clear next steps, specific tool recommendations, cost estimates"
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    18. Is there anything else we should know about your business before the session?
                  </label>
                  <textarea
                    name="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={handleChange}
                    placeholder="Optional: Share any additional context, challenges, or goals"
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 7 - Confirmation */}
          {step === 7 && (
            <div className="bg-white rounded-2xl border p-6 md:p-8 space-y-6">
              <div className="flex items-start gap-3 mb-6">
                <CheckCircle className="w-6 h-6 text-emerald-600 mt-1" />
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Step 7 — Confirmation & Next Steps</h2>
                  <p className="text-gray-600 mt-1">Final details before submission</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    19. Preferred session format *
                  </label>
                  <div className="space-y-2">
                    {["Zoom", "Google Meet"].map(option => (
                      <label key={option} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input
                          type="radio"
                          name="format"
                          value={option}
                          checked={formData.format === option}
                          onChange={handleChange}
                          className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                          required
                        />
                        <span className="text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      name="acknowledgement"
                      checked={formData.acknowledgement}
                      onChange={handleChange}
                      className="w-5 h-5 text-emerald-600 rounded focus:ring-emerald-500 mt-1"
                      required
                    />
                    <div>
                      <p className="font-medium text-gray-900">
                        20. Acknowledgement *
                      </p>
                      <p className="text-gray-600 mt-1">
                        I understand this session is strategic, not a demo, and focuses on clarity and practical recommendations.
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            {step > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                ← Previous
              </button>
            )}
            
            {step < 7 ? (
              <button
                type="button"
                onClick={nextStep}
                disabled={!isStepValid()}
                className={`ml-auto px-6 py-3 font-medium rounded-lg transition-colors ${isStepValid() 
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700' 
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
              >
                Continue →
              </button>
            ) : (
              <button
                type="submit"
                disabled={!isStepValid()}
                className={`ml-auto flex items-center gap-2 px-8 py-3 font-medium rounded-lg transition-colors ${isStepValid() 
                  ? 'bg-gray-900 text-white hover:bg-gray-800' 
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
              >
                <Send className="w-5 h-5" />
                Proceed to AI Discovery Session
              </button>
            )}
          </div>

          {/* Step Indicator */}
          <div className="text-center text-sm text-gray-500">
            Step {step} of 7 • {Math.round((step / 7) * 100)}% complete
          </div>
        </form>
      </div>
    </div>
  );
};

export default AIDiscoveryForm;