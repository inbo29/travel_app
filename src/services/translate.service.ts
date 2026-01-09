import { TranslateReq, TranslateRes, TranslationContext } from '@/domains/translate/types'
import { MOCK_TRANSLATIONS, MOCK_OCR_SCENARIOS } from '@/mocks/translate'

const SIMULATED_DELAY = 800

/**
 * Translation Service
 * Provides a unified API for text, voice, and OCR translation.
 * Mock implementation for frontend development.
 */
export const TranslateService = {
    /**
     * Translate text
     */
    async translateText(req: TranslateReq): Promise<TranslateRes> {
        await new Promise(r => setTimeout(r, SIMULATED_DELAY))

        // Find mock translation or generate a simulated one
        const mock = MOCK_TRANSLATIONS.find(
            t => t.sourceText.toLowerCase() === req.sourceText.toLowerCase() && t.fromLang === req.fromLang
        )

        if (mock) {
            return {
                sourceText: req.sourceText,
                translatedText: mock.translatedText,
                fromLang: req.fromLang,
                toLang: req.toLang,
                confidence: 0.95,
            }
        }

        // Fallback: Simulate translation with context marker
        const contextPrefix = req.context && req.context !== 'general' ? `[${req.context}] ` : ''
        return {
            sourceText: req.sourceText,
            translatedText: `${contextPrefix}[Translated: ${req.sourceText}]`,
            fromLang: req.fromLang,
            toLang: req.toLang,
            confidence: 0.75,
        }
    },

    /**
     * Translate voice (simulated)
     * In real implementation, this would send audio blob to a speech-to-text + translation API.
     */
    async translateVoice(audioBlob: Blob | null, fromLang: string, toLang: string): Promise<TranslateRes> {
        await new Promise(r => setTimeout(r, SIMULATED_DELAY * 2))

        // Simulate recognized text
        const recognizedPhrases = [
            'Hello, how are you?',
            'Where is the nearest station?',
            'Thank you very much!',
            'How much does this cost?',
        ]
        const recognized = recognizedPhrases[Math.floor(Math.random() * recognizedPhrases.length)]

        return this.translateText({ sourceText: recognized, fromLang, toLang, context: 'travel' })
    },

    /**
     * Translate OCR image (simulated)
     * In real implementation, this would extract text from an image and translate it.
     */
    async translateOCR(imageId: string, fromLang: string, toLang: string): Promise<TranslateRes> {
        await new Promise(r => setTimeout(r, SIMULATED_DELAY * 2.5))

        // Find scenario by imageId
        const scenario = MOCK_OCR_SCENARIOS.find(s => s.id === imageId)

        if (scenario) {
            return {
                sourceText: scenario.extractedText,
                translatedText: scenario.translatedText,
                fromLang: fromLang,
                toLang: toLang,
                detectedLang: scenario.detectedLang,
                confidence: 0.88,
            }
        }

        // Fallback
        return {
            sourceText: 'Menu: Coffee $5, Tea $3',
            translatedText: '메뉴: 커피 $5, 차 $3',
            fromLang: 'en',
            toLang: 'ko',
            confidence: 0.80,
        }
    },

    /**
     * Get simulated partner reply for conversation mode
     */
    async getPartnerReply(lastMessage: string, fromLang: string, toLang: string): Promise<TranslateRes> {
        await new Promise(r => setTimeout(r, SIMULATED_DELAY))

        const replies = [
            { source: 'Yes, I understand.', translated: '네, 알겠습니다.' },
            { source: 'Go straight and turn left.', translated: '직진 후 좌회전하세요.' },
            { source: 'It\'s 5000 won.', translated: '5000원입니다.' },
            { source: 'The train leaves at 10:30.', translated: '기차는 10시 30분에 출발합니다.' },
        ]
        const reply = replies[Math.floor(Math.random() * replies.length)]

        return {
            sourceText: reply.source,
            translatedText: reply.translated,
            fromLang: fromLang,
            toLang: toLang,
            confidence: 0.92,
        }
    }
}
