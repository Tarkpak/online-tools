// 初始化 i18next
i18next
    .use(i18nextHttpBackend)
    .init({
        fallbackLng: 'zh',
        debug: true,
        backend: {
            loadPath: '/locales/{{lng}}/{{ns}}.json',
        },
        resources: {
            zh: {
                translation: {
                    title: "在线工具集",
                    subtitle: "纯前端实现的实用工具集合，无需后端服务",
                    tools: {
                        lineArt: {
                            title: "图片转线稿",
                            description: "将图片转换为线稿风格，支持实时预览和参数调节"
                        },
                        more: {
                            title: "更多工具",
                            description: "敬请期待..."
                        },
                        videoToAudio: {
                            title: "视频提取音频",
                            description: "从视频文件中提取音频，支持多种格式"
                        }
                    },
                    common: {
                        startUse: "开始使用 →"
                    },
                    footer: {
                        viewOn: "在",
                        sourceCode: "上查看源码"
                    }
                }
            },
            en: {
                translation: {
                    title: "Online Tools",
                    subtitle: "A collection of pure frontend tools, no backend required",
                    tools: {
                        lineArt: {
                            title: "Image to Line Art",
                            description: "Convert images to line art style with real-time preview and parameter adjustment"
                        },
                        more: {
                            title: "More Tools",
                            description: "Coming soon..."
                        },
                        videoToAudio: {
                            title: "Video to Audio",
                            description: "Extract audio from video files, supports multiple formats"
                        }
                    },
                    common: {
                        startUse: "Start Using →"
                    },
                    footer: {
                        viewOn: "View source code on",
                        sourceCode: ""
                    }
                }
            },
            ja: {
                translation: {
                    title: "オンラインツール",
                    subtitle: "フロントエンドのみで実装されたツールコレクション、バックエンド不要",
                    tools: {
                        lineArt: {
                            title: "画像線画変換",
                            description: "画像を線画スタイルに変換、リアルタイムプレビューとパラメータ調整をサポート"
                        },
                        more: {
                            title: "その他のツール",
                            description: "近日公開..."
                        },
                        videoToAudio: {
                            title: "動画から音声抽出",
                            description: "動画ファイルから音声を抽出、複数のフォーマットに対応"
                        }
                    },
                    common: {
                        startUse: "使用開始 →"
                    },
                    footer: {
                        viewOn: "ソースコードは",
                        sourceCode: "で確認できます"
                    }
                }
            }
        }
    }, function(err, t) {
        updateContent();
    });

// 语言切换函数
function changeLanguage(lng) {
    i18next.changeLanguage(lng, updateContent);
    document.documentElement.lang = lng;
}

// 更新页面内容
function updateContent() {
    document.title = i18next.t('title') + ' - Online Tools';
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        element.textContent = i18next.t(key);
    });
}

// 初始化时检测浏览器语言
document.addEventListener('DOMContentLoaded', () => {
    const browserLang = navigator.language.split('-')[0];
    const supportedLangs = ['zh', 'en', 'ja'];
    if (supportedLangs.includes(browserLang)) {
        document.getElementById('languageSelect').value = browserLang;
        changeLanguage(browserLang);
    }
}); 