let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let fileInput = document.getElementById('fileInput');
let slider = document.getElementById('slider');
let canvasContainer = document.querySelector('.canvas-container');
let sliderContainer = document.querySelector('.slider-container');
let sliderHandle = document.querySelector('.slider-handle');

let originalImageData = null;
let lineArtImageData = null;

// 处理图片上传
fileInput.addEventListener('change', function(e) {
    let file = e.target.files[0];
    let reader = new FileReader();
    
    reader.onload = function(event) {
        let img = new Image();
        img.onload = function() {
            // 设置画布尺寸
            canvas.width = img.width;
            canvas.height = img.height;
            canvasContainer.style.width = img.width + 'px';
            canvasContainer.style.height = img.height + 'px';
            
            // 添加加载动画类
            canvasContainer.classList.add('loaded');
            document.querySelector('.params-container').classList.add('loaded');
            
            // 绘制原始图片
            ctx.drawImage(img, 0, 0);
            
            // 保存原始图像数据
            originalImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            
            // 转换为线稿
            let src = cv.imread(canvas);
            let dst = new cv.Mat();
            
            // 转换为灰度图
            cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY);
            
            // 应用边缘检测
            cv.Canny(src, dst, 50, 150, 3, false);
            
            // 反转颜色
            cv.bitwise_not(dst, dst);
            
            // 显示结果并保存线稿图像数据
            cv.imshow(canvas, dst);
            lineArtImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            
            // 释放内存
            src.delete();
            dst.delete();
            
            // 初始显示混合效果
            blendImages(50);
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(file);
});

// 混合两个图像
function blendImages(percentage) {
    if (!originalImageData || !lineArtImageData) return;
    
    let blendedData = new ImageData(
        new Uint8ClampedArray(originalImageData.data),
        canvas.width,
        canvas.height
    );
    
    for (let x = 0; x < canvas.width; x++) {
        // 根据滑块位置决定在哪里切换图像
        let threshold = (canvas.width * percentage) / 100;
        
        for (let y = 0; y < canvas.height; y++) {
            let index = (y * canvas.width + x) * 4;
            
            if (x < threshold) {
                blendedData.data[index] = originalImageData.data[index];
                blendedData.data[index + 1] = originalImageData.data[index + 1];
                blendedData.data[index + 2] = originalImageData.data[index + 2];
                blendedData.data[index + 3] = originalImageData.data[index + 3];
            } else {
                blendedData.data[index] = lineArtImageData.data[index];
                blendedData.data[index + 1] = lineArtImageData.data[index + 1];
                blendedData.data[index + 2] = lineArtImageData.data[index + 2];
                blendedData.data[index + 3] = lineArtImageData.data[index + 3];
            }
        }
    }
    
    ctx.putImageData(blendedData, 0, 0);
}

// 添加拖拽功能
let isDragging = false;
let startX, sliderLeft;

// 添加平滑的滑块动画
let lastPercentage = 50;
function animateSlider(targetPercentage) {
    const duration = 300; // 动画持续时间（毫秒）
    const startTime = performance.now();
    const startPercentage = lastPercentage;
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // 使用缓动函数使动画更平滑
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        
        const currentPercentage = startPercentage + (targetPercentage - startPercentage) * easeProgress;
        
        sliderContainer.style.left = `${currentPercentage}%`;
        blendImages(currentPercentage);
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            lastPercentage = targetPercentage;
        }
    }
    
    requestAnimationFrame(update);
}

// 修改滑块更新函数，直接更新位置
function updateSlider(clientX) {
    const rect = canvas.getBoundingClientRect();
    const containerWidth = rect.width;
    const offsetX = clientX - rect.left;
    let percentage = (offsetX / containerWidth) * 100;
    percentage = Math.max(0, Math.min(100, percentage));
    
    slider.value = percentage;
    sliderContainer.style.left = `${percentage}%`;
    blendImages(percentage);
}

// 添加鼠标/触摸事件监听
sliderContainer.addEventListener('mousedown', startDragging);
sliderHandle.addEventListener('mousedown', startDragging);
document.addEventListener('mousemove', drag);
document.addEventListener('mouseup', stopDragging);

// 添加触摸事件支持
sliderContainer.addEventListener('touchstart', startDragging);
sliderHandle.addEventListener('touchstart', startDragging);
document.addEventListener('touchmove', drag);
document.addEventListener('touchend', stopDragging);

function startDragging(e) {
    isDragging = true;
    sliderContainer.style.transition = 'none'; // 拖动时禁用过渡效果
    
    // 处理鼠标或触摸事件
    const clientX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
    updateSlider(clientX);
}

function drag(e) {
    if (!isDragging) return;
    e.preventDefault();
    
    // 处理鼠标或触摸事件
    const clientX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
    updateSlider(clientX);
}

function stopDragging() {
    isDragging = false;
    sliderContainer.style.transition = ''; // 恢复过渡效果
}

// 修改滑块输入事件，移除动画
slider.addEventListener('input', function() {
    let value = this.value;
    sliderContainer.style.left = `${value}%`;
    blendImages(value);
});

// 检查 OpenCV.js 是否已加载
if (typeof cv === 'undefined') {
    document.addEventListener('opencv_loaded', function() {
        fileInput.disabled = false;
    });
} else {
    fileInput.disabled = false;
}

// 参数控制
let threshold1 = document.getElementById('threshold1');
let threshold2 = document.getElementById('threshold2');
let blurSize = document.getElementById('blurSize');
let threshold1Value = document.getElementById('threshold1Value');
let threshold2Value = document.getElementById('threshold2Value');
let blurSizeValue = document.getElementById('blurSizeValue');

// 更新参数显示
function updateParamValue(input, valueDisplay) {
    valueDisplay.textContent = input.value;
}

// 参数变化时重新处理图像
function processImage() {
    if (!originalImageData) return;
    
    // 恢复原图
    ctx.putImageData(originalImageData, 0, 0);
    
    // 转换为线稿
    let src = cv.imread(canvas);
    let dst = new cv.Mat();
    
    // 转换为灰度图
    cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY);
    
    // 应用高斯模糊
    let ksize = parseInt(blurSize.value);
    cv.GaussianBlur(src, src, new cv.Size(ksize, ksize), 0, 0, cv.BORDER_DEFAULT);
    
    // 应用边缘检测
    cv.Canny(src, dst, 
        parseInt(threshold1.value), 
        parseInt(threshold2.value), 
        3, false);
    
    // 反转颜色
    cv.bitwise_not(dst, dst);
    
    // 显示结果并保存线稿图像数据
    cv.imshow(canvas, dst);
    lineArtImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    
    // 释放内存
    src.delete();
    dst.delete();
    
    // 更新混合显示
    blendImages(slider.value);
}

// 添加加载动画
window.addEventListener('load', function() {
    document.querySelector('.file-input-label').style.opacity = '1';
    document.querySelector('.file-input-label').style.transform = 'translateY(0)';
});

// 添加参数滑块的平滑动画
function smoothUpdateParam(callback) {
    let timeout;
    return function() {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            callback();
        }, 50);
    }
}

threshold1.addEventListener('input', smoothUpdateParam(() => {
    updateParamValue(threshold1, threshold1Value);
    processImage();
}));

threshold2.addEventListener('input', smoothUpdateParam(() => {
    updateParamValue(threshold2, threshold2Value);
    processImage();
}));

blurSize.addEventListener('input', smoothUpdateParam(() => {
    updateParamValue(blurSize, blurSizeValue);
    processImage();
}));

// 初始化参数显示
updateParamValue(threshold1, threshold1Value);
updateParamValue(threshold2, threshold2Value);
updateParamValue(blurSize, blurSizeValue); 