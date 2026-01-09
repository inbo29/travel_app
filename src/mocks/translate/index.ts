// Mock Translation Data

export const MOCK_TRANSLATIONS = [
    // Travel Context
    { sourceText: 'Hello', translatedText: '안녕하세요', fromLang: 'en', toLang: 'ko', context: 'travel' },
    { sourceText: 'Thank you', translatedText: '감사합니다', fromLang: 'en', toLang: 'ko', context: 'travel' },
    { sourceText: 'Where is the bathroom?', translatedText: '화장실이 어디에 있나요?', fromLang: 'en', toLang: 'ko', context: 'travel' },
    { sourceText: 'How much is this?', translatedText: '이거 얼마에요?', fromLang: 'en', toLang: 'ko', context: 'travel' },
    { sourceText: 'Where is the nearest station?', translatedText: '가장 가까운 역이 어디에 있나요?', fromLang: 'en', toLang: 'ko', context: 'travel' },
    { sourceText: 'I need help', translatedText: '도움이 필요해요', fromLang: 'en', toLang: 'ko', context: 'travel' },
    { sourceText: 'Can you speak English?', translatedText: '영어 할 수 있어요?', fromLang: 'en', toLang: 'ko', context: 'travel' },
    { sourceText: 'I\'m lost', translatedText: '길을 잃었어요', fromLang: 'en', toLang: 'ko', context: 'travel' },

    // Mongolian
    { sourceText: 'Hello', translatedText: 'Сайн байна уу', fromLang: 'en', toLang: 'mn', context: 'travel' },
    { sourceText: 'Thank you', translatedText: 'Баярлалаа', fromLang: 'en', toLang: 'mn', context: 'travel' },
    { sourceText: 'How much is this?', translatedText: 'Энэ хэд вэ?', fromLang: 'en', toLang: 'mn', context: 'travel' },

    // Chinese
    { sourceText: 'Hello', translatedText: '你好', fromLang: 'en', toLang: 'zh', context: 'travel' },
    { sourceText: 'Thank you', translatedText: '谢谢', fromLang: 'en', toLang: 'zh', context: 'travel' },

    // Japanese
    { sourceText: 'Hello', translatedText: 'こんにちは', fromLang: 'en', toLang: 'ja', context: 'travel' },
    { sourceText: 'Thank you', translatedText: 'ありがとうございます', fromLang: 'en', toLang: 'ja', context: 'travel' },

    // Korean to English (reverse)
    { sourceText: '안녕하세요', translatedText: 'Hello', fromLang: 'ko', toLang: 'en', context: 'travel' },
    { sourceText: '감사합니다', translatedText: 'Thank you', fromLang: 'ko', toLang: 'en', context: 'travel' },
]

export const MOCK_OCR_SCENARIOS = [
    {
        id: 'menu_1',
        imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
        extractedText: 'Grilled Beef Burger - $12\nCaesar Salad - $8\nCold Brew Coffee - $5',
        translatedText: '그릴드 비프 버거 - $12\n시저 샐러드 - $8\n콜드브루 커피 - $5',
        detectedLang: 'en',
    },
    {
        id: 'sign_1',
        imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400',
        extractedText: 'EXIT - Emergency Only\nDo not block this door',
        translatedText: '출구 - 비상시에만\n이 문을 막지 마세요',
        detectedLang: 'en',
    },
    {
        id: 'ticket_1',
        imageUrl: 'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=400',
        extractedText: 'Platform 3\nDeparture: 10:30\nDestination: Central Station',
        translatedText: '3번 플랫폼\n출발: 10:30\n목적지: 중앙역',
        detectedLang: 'en',
    },
]

export const MOCK_VOICE_PHRASES = [
    'Hello, how are you?',
    'Where is the nearest station?',
    'Thank you very much!',
    'How much does this cost?',
    'Can you help me?',
    'I need a taxi.',
]
