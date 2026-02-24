import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Sun, Sparkles, Phone, Mail, MessageCircle } from "lucide-react";

// ─── Chat message types ───
interface ChatMessage {
    id: number;
    sender: "bot" | "user";
    text: string;
    options?: string[];
}

// ═══════════════════ Component ═══════════════════
export function SolarMitraChatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const msgIdRef = useRef(0);

    const nextId = () => ++msgIdRef.current;

    // auto scroll
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    // focus input when opened
    useEffect(() => {
        if (isOpen && inputRef.current) {
            setTimeout(() => inputRef.current?.focus(), 300);
        }
    }, [isOpen]);

    // ─── Send message to Gemini API ───
    const sendToAI = useCallback(
        async (userMessage: string, conversationHistory: ChatMessage[]) => {
            try {
                const history = conversationHistory
                    .filter((m) => m.text)
                    .map((m) => ({
                        sender: m.sender,
                        text: m.text,
                    }));

                const res = await fetch("/api/chatbot", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ message: userMessage, history }),
                });

                const data = await res.json();
                return data.reply || "I couldn't process that. Please try again.";
            } catch {
                return "I'm having trouble connecting. Please contact Swayog Energy directly at +91 8484030070 or WhatsApp +91 9272099152.";
            }
        },
        []
    );

    // ─── Bot reply ───
    const botReply = useCallback(
        (text: string, opts?: { options?: string[] }) => {
            setMessages((prev) => [
                ...prev,
                {
                    id: msgIdRef.current++,
                    sender: "bot",
                    text,
                    options: opts?.options,
                },
            ]);
        },
        []
    );

    // ─── Greeting on open ───
    const handleOpen = () => {
        setIsOpen(true);
        if (messages.length === 0) {
            setMessages([
                {
                    id: nextId(),
                    sender: "bot",
                    text: "Namaste! I'm **Suryamitra**, your AI solar assistant from Swayog Energy.\n\nI can answer any solar question, recommend the best plan, troubleshoot issues, or connect you with our team. What would you like to know?",
                    options: [
                        "Best plan for me",
                        "How does solar work?",
                        "Available subsidies",
                        "Solar panel types",
                        "Troubleshooting help",
                        "Contact Swayog Energy",
                    ],
                },
            ]);
        }
    };

    // ─── Handle option button clicks ───
    const handleOptionClick = async (option: string) => {
        const userMsg: ChatMessage = {
            id: nextId(),
            sender: "user",
            text: option,
        };
        setMessages((prev) => [...prev, userMsg]);
        setIsTyping(true);

        // Special: contact card
        if (option === "Contact Swayog Energy" || option === "Contact us") {
            setIsTyping(false);
            botReply(
                "Here's how to reach Swayog Energy:\n\n**Call:** +91 8484030070\n**WhatsApp:** +91 9272099152\n**Email:** info@swayogurja.com\n**Hours:** Mon–Sat, 10 AM – 6:30 PM\n**Office:** 205, Gauri Ganesh Apt, Katol Rd, Nagpur 440013\n\nVisit our Contact page for a free quote.",
                {
                    options: [
                        "Suggest a plan for me",
                        "Ask a solar question",
                        "About Swayog Energy",
                    ],
                }
            );
            return;
        }

        // Special: best plan → ask bill
        if (
            option.toLowerCase().includes("best plan") ||
            option.toLowerCase().includes("suggest a plan") ||
            option.toLowerCase().includes("what plan")
        ) {
            setIsTyping(false);
            botReply(
                "I'd love to help!\n\n**What is your current monthly electricity bill (in Rs)?**\n\nJust type the amount — e.g., 2500, 4000, etc.",
            );
            return;
        }

        // For all other options, send to Gemini AI
        const allMsgs = [...messages, userMsg];
        const reply = await sendToAI(option, allMsgs);
        setIsTyping(false);
        botReply(reply, {
            options: [
                "Best plan for me",
                "Contact us",
                "Ask another question",
            ],
        });
    };

    // ─── Handle free-text input ───
    const handleSend = async () => {
        const text = input.trim();
        if (!text || isTyping) return;

        const userMsg: ChatMessage = {
            id: nextId(),
            sender: "user",
            text,
        };
        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        setIsTyping(true);

        // Send to Gemini AI
        const allMsgs = [...messages, userMsg];
        const reply = await sendToAI(text, allMsgs);
        setIsTyping(false);

        // Determine smart follow-up options
        const replyLower = reply.toLowerCase();
        let followUpOptions: string[];
        if (replyLower.includes("bill") || replyLower.includes("plan") || replyLower.includes("rs ")) {
            followUpOptions = [
                "Contact us",
                "Available subsidies",
                "EMI / Financing options",
            ];
        } else if (replyLower.includes("contact") || replyLower.includes("phone")) {
            followUpOptions = [
                "Best plan for me",
                "How does solar work?",
            ];
        } else if (replyLower.includes("inverter") || replyLower.includes("error") || replyLower.includes("fault")) {
            followUpOptions = [
                "Low generation issue",
                "Battery backup options",
                "Contact us",
            ];
        } else if (replyLower.includes("panel") || replyLower.includes("mono") || replyLower.includes("poly")) {
            followUpOptions = [
                "Best plan for me",
                "Panel maintenance tips",
                "Warranty details",
            ];
        } else if (replyLower.includes("clean") || replyLower.includes("maintenance")) {
            followUpOptions = [
                "Bird protection for panels",
                "Best plan for me",
                "Contact us",
            ];
        } else {
            followUpOptions = [
                "Best plan for me",
                "Troubleshooting help",
                "Contact us",
            ];
        }

        botReply(reply, { options: followUpOptions });
    };

    // ─── Format message text (basic markdown bold) ───
    const formatText = (text: string) => {
        const parts = text.split(/(\*\*[^*]+\*\*)/g);
        return parts.map((part, i) => {
            if (part.startsWith("**") && part.endsWith("**")) {
                return (
                    <strong key={i} className="font-bold">
                        {part.slice(2, -2)}
                    </strong>
                );
            }
            return part.split("\n").map((line, j) => (
                <span key={`${i}-${j}`}>
                    {j > 0 && <br />}
                    {line}
                </span>
            ));
        });
    };

    return (
        <>
            {/* ─── Floating Chat Button ─── */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleOpen}
                        className="fixed bottom-[88px] sm:bottom-24 right-6 z-[100] w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-2xl flex items-center justify-center group touch-none"
                        style={{
                            background: "linear-gradient(135deg, #d97706, #15803d)",
                        }}
                        aria-label="Open Suryamitra chatbot"
                        data-testid="btn-chatbot-open"
                    >
                        {/* Subtle pulse ring */}
                        <span
                            className="absolute inset-0 rounded-full animate-ping opacity-20"
                            style={{
                                background: "linear-gradient(135deg, #d97706, #15803d)",
                            }}
                        />
                        <Sun className="w-7 h-7 sm:w-8 sm:h-8 text-white drop-shadow" />
                        {/* Tooltip */}
                        <span className="absolute right-full mr-3 px-3 py-1.5 bg-gray-900 text-white text-xs sm:text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none hidden sm:block font-medium tracking-wide">
                            Suryamitra
                        </span>
                    </motion.button>
                )}
            </AnimatePresence>

            {/* ─── Chat Window ─── */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 40, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 40, scale: 0.9 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[200] w-[calc(100vw-32px)] sm:w-[400px] h-[min(620px,85vh)] flex flex-col rounded-2xl overflow-hidden"
                        style={{
                            boxShadow: "0 25px 60px rgba(0,0,0,0.25), 0 0 0 1px rgba(0,0,0,0.05)",
                            background: "#ffffff",
                        }}
                    >
                        {/* Header */}
                        <div
                            className="flex items-center gap-3 px-5 py-4 shrink-0"
                            style={{
                                background: "linear-gradient(135deg, #15803d 0%, #0d7377 100%)",
                            }}
                        >
                            <div className="relative">
                                <div className="w-11 h-11 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/20">
                                    <Sun className="w-6 h-6 text-amber-300" />
                                </div>
                                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-green-800" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="text-white font-semibold text-[15px] leading-tight tracking-wide">
                                    Suryamitra
                                </h3>
                                <p className="text-emerald-200/80 text-xs font-medium mt-0.5">
                                    Swayog Energy • AI Assistant
                                </p>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 rounded-lg hover:bg-white/15 transition-colors"
                                aria-label="Close chatbot"
                            >
                                <X className="w-5 h-5 text-white/90" />
                            </button>
                        </div>

                        {/* Messages */}
                        <div
                            ref={scrollRef}
                            className="flex-1 overflow-y-auto px-4 py-4 space-y-3 scroll-smooth bg-gradient-to-b from-gray-50/80 to-white"
                            style={{ scrollbarWidth: "thin" }}
                        >
                            {messages.map((msg) => (
                                <div key={msg.id}>
                                    <motion.div
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className={`flex ${msg.sender === "user"
                                            ? "justify-end"
                                            : "justify-start"
                                            }`}
                                    >
                                        <div
                                            className={`max-w-[85%] px-4 py-3 text-[13px] leading-relaxed ${msg.sender === "user"
                                                ? "bg-gradient-to-br from-green-700 to-teal-700 text-white rounded-2xl rounded-br-sm"
                                                : "bg-white text-gray-700 rounded-2xl rounded-bl-sm border border-gray-100/80 shadow-sm"
                                                }`}
                                        >
                                            {formatText(msg.text)}
                                        </div>
                                    </motion.div>

                                    {/* Option buttons */}
                                    {msg.options && (
                                        <div className="flex flex-wrap gap-1.5 mt-2.5 ml-1">
                                            {msg.options.map((opt) => (
                                                <button
                                                    key={opt}
                                                    onClick={() => handleOptionClick(opt)}
                                                    className="text-xs px-3.5 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-green-50 hover:border-green-300 hover:text-green-700 transition-all duration-200 font-medium shadow-sm"
                                                >
                                                    {opt}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}

                            {/* Typing indicator */}
                            {isTyping && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex justify-start"
                                >
                                    <div className="bg-white rounded-2xl rounded-bl-sm border border-gray-100 shadow-sm px-4 py-3 flex items-center gap-1.5">
                                        <span
                                            className="w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce"
                                            style={{ animationDelay: "0ms" }}
                                        />
                                        <span
                                            className="w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce"
                                            style={{ animationDelay: "150ms" }}
                                        />
                                        <span
                                            className="w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce"
                                            style={{ animationDelay: "300ms" }}
                                        />
                                        <span className="text-[11px] text-gray-400 ml-2 font-medium">
                                            Thinking...
                                        </span>
                                    </div>
                                </motion.div>
                            )}
                        </div>

                        {/* Input */}
                        <div className="px-4 py-3 border-t border-gray-100 bg-white shrink-0">
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleSend();
                                }}
                                className="flex items-center gap-2"
                            >
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Ask anything about solar energy..."
                                    disabled={isTyping}
                                    className="flex-1 bg-gray-50 rounded-xl px-4 py-2.5 text-sm outline-none border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-50 transition-all placeholder:text-gray-400 disabled:opacity-50 font-medium"
                                />
                                <button
                                    type="submit"
                                    disabled={!input.trim() || isTyping}
                                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200 disabled:opacity-30"
                                    style={{
                                        background:
                                            input.trim() && !isTyping
                                                ? "linear-gradient(135deg, #15803d, #0d7377)"
                                                : "#e5e7eb",
                                    }}
                                >
                                    <Send className="w-4 h-4 text-white" />
                                </button>
                            </form>
                            <p className="text-[10px] text-center text-gray-300 mt-2 font-medium tracking-wider uppercase">
                                Swayog Energy — AI Assistant
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
