import { Button } from "@/components/ui/button";

const WattsunAi = () => {
  const handleLaunchApp = () => {
    window.open("https://wattsun-ai.vercel.app/", "_blank");
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-orange-600 mb-4">
            ☀️ wattsun.Ai — The Intelligent Solar Energy Expert
          </h1>
          <p className="text-lg text-gray-600">
            A voice-powered AI assistant specializing in India's renewable energy landscape, electrical systems, and Electric Vehicles (EV). Built with dynamic Multi-Model AI routing, serverless architecture, and a premium sun-themed web UI.
          </p>
        </div>

        <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-8 rounded-lg mb-8">
          <h2 className="text-2xl font-semibold text-orange-700 mb-4">🎯 Our Aim</h2>
          <p className="text-gray-700 mb-4">
            The primary aim of <strong>wattsun.Ai</strong> is to democratize access to complex, highly technical electrical and solar energy knowledge. We aim to bridge the gap between complex government policies, intricate electrical engineering concepts, and the everyday consumer or business owner who wants to transition to renewable energy in India.
          </p>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-green-50 p-8 rounded-lg mb-8">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">❓ Why We Made This</h2>
          <p className="text-gray-700 mb-4">
            Navigating the renewable energy sector—specifically regarding rooftop solar subsidies, DISCOM regulations, ROI calculations, and state-wise EV policies—is often overwhelming for the general public. Information is scattered, highly technical, and difficult to comprehend.
          </p>
          <p className="text-gray-700">
            We built <strong>wattsun.Ai</strong> because there was a distinct lack of centralized, easy-to-understand, and highly accurate advisory tools dedicated exclusively to India's energy transition. We wanted to create an AI that doesn't just give generic answers, but provides verified, structured, step-by-step guidance.
          </p>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-8 rounded-lg mb-8">
          <h2 className="text-2xl font-semibold text-purple-700 mb-4">🚀 Main Purpose</h2>
          <p className="text-gray-700 mb-4">
            The core purpose of <strong>wattsun.Ai</strong> is to function as a <strong>24/7 Virtual Energy Consultant</strong>.
          </p>
          <p className="text-gray-700 mb-4"><strong>What does it do?</strong></p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li><strong>Educates</strong>: Simplifies complex concepts like grid-tied net metering or LCOE calculations for laymen.</li>
            <li><strong>Advises</strong>: Helps users calculate their Return on Investment (ROI) for solar installations.</li>
            <li><strong>Guides</strong>: Breaks down state-by-state subsidies (all 28 states + 8 UTs) and EV charging infrastructure rules.</li>
            <li><strong>Validates</strong>: Automatically cross-references its data to deliver links to verified government portals (MNRE, state energy departments) rather than unreliable blogs.</li>
          </ul>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-teal-50 p-8 rounded-lg mb-8">
          <h2 className="text-2xl font-semibold text-green-700 mb-4">🌟 Key Features</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">Feature</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Details</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">🤖 <strong>Multi-Model Engine</strong></td>
                  <td className="border border-gray-300 px-4 py-2">Seamlessly switches between Gemini 1.5 Pro, Gemini 1.5 Flash, and Groq LLaMA 3.</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">🌍 <strong>State-Aware Logic</strong></td>
                  <td className="border border-gray-300 px-4 py-2">Understands and adapts to regional energy policies across India.</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">🔊 <strong>Voice Integration</strong></td>
                  <td className="border border-gray-300 px-4 py-2">Native Text-to-Speech (TTS) engine with localized Indian conversational pacing.</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">📊 <strong>Structured Outputs</strong></td>
                  <td className="border border-gray-300 px-4 py-2">Responses are strictly formatted into *Explanations*, *Data Tables*, *Verified Links*, and *Video References*.</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">💡 <strong>Smart Follow-Ups</strong></td>
                  <td className="border border-gray-300 px-4 py-2">Automatically generates adjacent, clickable follow-up questions to keep the user learning.</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">🔐 <strong>Cloud Sync</strong></td>
                  <td className="border border-gray-300 px-4 py-2">Powered by Firebase Firestore for real-time chat history persistence across devices.</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">📄 <strong>PDF Generation</strong></td>
                  <td className="border border-gray-300 px-4 py-2">One-click export of chat sessions into beautifully formatted PDF documents.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="text-center">
          <p className="text-gray-600 italic mb-6">
            *Developed with 💛 for a sustainable future.*
          </p>
          <Button
            onClick={handleLaunchApp}
            className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 text-lg"
          >
            Launch wattsun.Ai
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WattsunAi;