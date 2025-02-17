// 国际化配置
i18next.init({
    fallbackLng: 'zh',
    resources: {
        zh: {
            translation: {
                lineArt: {
                    title: "图片转线稿工具",
                    selectImage: "选择图片",
                    params: {
                        threshold: "边缘检测阈值:",
                        blur: "模糊程度:"
                    },
                    tips: {
                        drag: "拖动滑块查看原图与线稿对比",
                        adjust: "调整参数以获得最佳效果"
                    }
                },
                common: {
                    backToHome: "返回主页"
                }
            }
        },
        en: {
            translation: {
                lineArt: {
                    title: "Image to Line Art Converter",
                    selectImage: "Select Image",
                    params: {
                        threshold: "Edge Detection Threshold:",
                        blur: "Blur Level:"
                    },
                    tips: {
                        drag: "Drag slider to compare original and line art",
                        adjust: "Adjust parameters for best results"
                    }
                },
                common: {
                    backToHome: "Back to Home"
                }
            }
        },
        ja: {
            translation: {
                lineArt: {
                    title: "画像線画変換ツール",
                    selectImage: "画像を選択",
                    params: {
                        threshold: "エッジ検出しきい値:",
                        blur: "ぼかしレベル:"
                    },
                    tips: {
                        drag: "スライダーで元画像と線画を比較",
                        adjust: "パラメータを調整して最適な結果を得る"
                    }
                },
                common: {
                    backToHome: "ホームに戻る"
                }
            }
        }
    }
}, function(err, t) {
    updateContent();
});

// 语言切换相关函数
function changeLanguage(lng) {
    i18next.changeLanguage(lng, updateContent);
    document.documentElement.lang = lng;
}

function updateContent() {
    document.title = i18next.t('lineArt.title');
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        element.textContent = i18next.t(key);
    });
}

// 初始化检测浏览器语言
document.addEventListener('DOMContentLoaded', () => {
    const browserLang = navigator.language.split('-')[0];
    const supportedLangs = ['zh', 'en', 'ja'];
    if (supportedLangs.includes(browserLang)) {
        document.getElementById('languageSelect').value = browserLang;
        changeLanguage(browserLang);
    }
});

// 图片处理相关代码
// ... 保持原有的图片处理代码 ... 