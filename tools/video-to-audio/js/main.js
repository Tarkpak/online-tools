// 国际化配置
i18next.init({
    fallbackLng: 'zh',
    resources: {
        zh: {
            translation: {
                videoToAudio: {
                    title: "视频提取音频",
                    selectVideo: "选择视频文件",
                    dragTip: "或将视频文件拖放到此处",
                    processing: "正在处理...",
                    download: "下载音频",
                    error: "处理出错，请重试"
                },
                common: {
                    backToHome: "返回主页"
                }
            }
        },
        en: {
            translation: {
                videoToAudio: {
                    title: "Video to Audio Converter",
                    selectVideo: "Select Video File",
                    dragTip: "Or drag and drop video file here",
                    processing: "Processing...",
                    download: "Download Audio",
                    error: "Error occurred, please try again"
                },
                common: {
                    backToHome: "Back to Home"
                }
            }
        },
        ja: {
            translation: {
                videoToAudio: {
                    title: "動画から音声を抽出",
                    selectVideo: "動画ファイルを選択",
                    dragTip: "またはここにファイルをドロップ",
                    processing: "処理中...",
                    download: "音声をダウンロード",
                    error: "エラーが発生しました。再試行してください"
                },
                common: {
                    backToHome: "ホームに戻る"
                }
            }
        }
    }
}, updateContent);

// 语言切换相关函数
function changeLanguage(lng) {
    i18next.changeLanguage(lng, updateContent);
    document.documentElement.lang = lng;
}

function updateContent() {
    document.title = i18next.t('videoToAudio.title');
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        element.textContent = i18next.t(key);
    });
}

// 视频处理相关代码
// ... 保持原有的视频处理代码 ... 