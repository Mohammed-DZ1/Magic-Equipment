
export const sendMessageToGemini = async (message: string, service: 'equipment' | 'realEstate' | 'hydraulics' = 'equipment', language: 'en' | 'fr' | 'ar' = 'en'): Promise<string> => {
    const maxRetries = 3;
    const retryDelay = 2000; // 2 seconds between retries
    let lastError = '';

    // Service context for AI
    const serviceContext = {
        equipment: {
            en: "The user is inquiring about heavy equipment rental services. Provide helpful information about mobile crane trucks, backhoe loaders, and Shacman trucks.",
            fr: "L'utilisateur s'enquiert sur les services de location d'équipements lourds. Fournissez des informations utiles sur les camions grues mobiles, les tractopelles et les camions Shacman.",
            ar: "المستخدم يستفسر عن خدمات تأجير المعدات الثقيلة. قدم معلومات مفيدة عن شاحنات الرافعات المتنقلة والجرافات وشاحنات شاكمان."
        },
        realEstate: {
            en: "The user is inquiring about luxury residential properties and real estate services. Discuss modern family homes, luxury villas, and apartment complexes we've developed.",
            fr: "L'utilisateur s'enquiert sur les propriétés résidentielles de luxe et les services immobiliers. Discutez des maisons familiales modernes, des villas de luxe et des complexes d'appartements que nous avons développés.",
            ar: "المستخدم يستفسر عن العقارات السكنية الفاخرة والخدمات العقارية. ناقش المنازل العائلية الحديثة والفلل الفاخرة ومجمعات الشقق التي طورناها."
        },
        hydraulics: {
            en: "The user is inquiring about hydraulic systems and heavy construction services. Provide information about pipeline installation, excavation, and infrastructure projects.",
            fr: "L'utilisateur s'enquiert sur les systèmes hydrauliques et les services de construction lourde. Fournissez des informations sur l'installation de pipelines, l'excavation et les projets d'infrastructure.",
            ar: "المستخدم يستفسر عن أنظمة الهيدروليك وخدمات البناء الثقيل. قدم معلومات عن تركيب الأنابيب والتنقيب والمشاريع البنية التحتية."
        }
    };

    const context = serviceContext[service][language as 'en' | 'fr' | 'ar'];

    const systemPrompt = `You are Assia, a professional assistant for Magic Equipment, an integrated construction company operating in Oran and Mascara, Algeria. ${context} 
    
Always respond in the same language as the user's question. Be professional, helpful, and concise. When relevant, mention specific services, completed projects, or company capabilities. If you don't have specific information about a request, politely direct the user to contact the company directly.`;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const response = await fetch('/.netlify/functions/gemini-proxy', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message, systemPrompt }),
            });

            // If success, return the response
            if (response.ok) {
                const data = await response.json();
                return data.text ?? "Sorry, an error occurred. Could you please rephrase your question? / Désolé, une erreur s'est produite. Pourriez-vous reformuler votre question ?";
            }

            // If 500 error and not last attempt, retry
            if (response.status === 500 && attempt < maxRetries) {
                lastError = `Server error (attempt ${attempt}/${maxRetries})`;
                console.warn(`Gemini proxy 500 error - retrying in ${retryDelay}ms... (attempt ${attempt}/${maxRetries})`);
                await new Promise(resolve => setTimeout(resolve, retryDelay));
                continue;
            }

            // If other error or last attempt, return error message
            console.error('Gemini proxy error:', response.statusText);
            return "Sorry, the AI assistant is currently unavailable. / Désolé, l'assistant IA n'est pas disponible pour le moment.";

        } catch (error) {
            lastError = String(error);
            
            // If not last attempt, retry
            if (attempt < maxRetries) {
                console.warn(`Gemini proxy error - retrying in ${retryDelay}ms... (attempt ${attempt}/${maxRetries}):`, error);
                await new Promise(resolve => setTimeout(resolve, retryDelay));
                continue;
            }

            // Last attempt failed
            console.error("Error sending message to Gemini after all retries:", error);
            return "Sorry, an error occurred. Could you please rephrase your question? / Désolé, une erreur s'est produite. Pourriez-vous reformuler votre question ?";
        }
    }

    return "Sorry, an error occurred. Could you please rephrase your question? / Désolé, une erreur s'est produite. Pourriez-vous reformuler votre question ?";
};
