// @ts-nocheck - 禁用 TypeScript 类型检查

// 导入 React 的 useEffect Hook，用于处理组件生命周期
import { useEffect } from 'react';

// 自定义 Hook：用于创建鼠标跟随的 Canvas 光标效果
const useCanvasCursor = () => {
  // 正弦波生成器构造函数：用于生成颜色变化的色相值
  // @param {Object} e - 配置对象，包含相位、偏移量、频率、振幅等参数
  function n(e) {
    // 调用初始化方法，如果未传入参数则使用空对象
    this.init(e || {});
  }
  // 为正弦波生成器添加原型方法
  n.prototype = {
    // 初始化方法：设置正弦波的各项参数
    // @param {Object} e - 配置对象
    init: function (e) {
      // 设置相位角，默认为 0
      this.phase = e.phase || 0;
      // 设置偏移量，用于调整色相的基础值
      this.offset = e.offset || 0;
      // 设置频率，控制色相变化的速度，默认 0.001
      this.frequency = e.frequency || 0.001;
      // 设置振幅，控制色相变化的幅度，默认 1
      this.amplitude = e.amplitude || 1;
    },
    // 更新方法：更新相位并计算当前色相值
    update: function () {
      return (
        // 增加相位值（相位 += 频率）
        (this.phase += this.frequency),
        // 计算当前色相值：偏移量 + sin(相位) * 振幅
        // 使用逗号运算符，返回最后一个表达式的值
        (e = this.offset + Math.sin(this.phase) * this.amplitude)
      );
    },
    // 获取当前色相值
    value: function () {
      // 返回当前计算出的色相值（注意：这里返回的是外部变量 e）
      return e;
    },
  };

  // 线条类构造函数：表示一条跟随鼠标的轨迹线
  // @param {Object} e - 配置对象，包含弹簧系数等参数
  function Line(e) {
    // 调用初始化方法，如果未传入参数则使用空对象
    this.init(e || {});
  }

  // 为线条类添加原型方法
  Line.prototype = {
    // 初始化方法：设置线条的物理属性和节点数组
    // @param {Object} e - 配置对象
    init: function (e) {
      // 设置弹簧系数，添加随机变化（±0.02）使每条线略有不同
      this.spring = e.spring + 0.1 * Math.random() - 0.02;
      // 设置摩擦系数，添加随机变化（±0.002）使每条线略有不同
      this.friction = E.friction + 0.01 * Math.random() - 0.002;
      // 初始化节点数组，用于存储线条上的所有节点
      this.nodes = [];
      // 循环创建指定数量的节点
      for (let t, n = 0; n < E.size; n++) {
        // 创建新节点
        t = new Node();
        // 设置节点的初始 x 坐标为当前鼠标位置
        t.x = pos.x;
        // 设置节点的初始 y 坐标为当前鼠标位置
        t.y = pos.y;
        // 将节点添加到节点数组中
        this.nodes.push(t);
      }
    },
    // 更新方法：根据物理模拟更新所有节点的位置
    update: function () {
      // 获取弹簧系数
      let e = this.spring,
        // 获取第一个节点（跟随鼠标的节点）
        t = this.nodes[0];
      // 第一个节点：根据与鼠标位置的距离计算 x 方向速度增量
      t.vx += (pos.x - t.x) * e;
      // 第一个节点：根据与鼠标位置的距离计算 y 方向速度增量
      t.vy += (pos.y - t.y) * e;
      // 遍历所有节点，更新每个节点的位置
      for (let n, i = 0, a = this.nodes.length; i < a; i++)
        // 获取当前节点
        (t = this.nodes[i]),
          // 如果不是第一个节点（i > 0）
          0 < i &&
            // 获取前一个节点
            ((n = this.nodes[i - 1]),
            // 当前节点：根据与前一个节点的距离计算 x 方向速度增量
            (t.vx += (n.x - t.x) * e),
            // 当前节点：根据与前一个节点的距离计算 y 方向速度增量
            (t.vy += (n.y - t.y) * e),
            // 当前节点：继承前一个节点的 x 方向速度（阻尼传递）
            (t.vx += n.vx * E.dampening),
            // 当前节点：继承前一个节点的 y 方向速度（阻尼传递）
            (t.vy += n.vy * E.dampening)),
          // 应用摩擦系数，减少 x 方向速度
          (t.vx *= this.friction),
          // 应用摩擦系数，减少 y 方向速度
          (t.vy *= this.friction),
          // 根据速度更新 x 坐标位置
          (t.x += t.vx),
          // 根据速度更新 y 坐标位置
          (t.y += t.vy),
          // 逐渐减小弹簧系数（张力效果），使后续节点响应更慢
          (e *= E.tension);
    },
    // 绘制方法：在 Canvas 上绘制线条
    draw: function () {
      // 声明临时变量
      var e,
        t,
        // 获取第一个节点的 x 坐标
        n = this.nodes[0].x,
        // 获取第一个节点的 y 坐标
        i = this.nodes[0].y;
      // 开始新的绘制路径
      ctx.beginPath();
      // 将画笔移动到第一个节点位置
      ctx.moveTo(n, i);
      // 遍历节点，使用二次贝塞尔曲线连接（跳过最后一个节点）
      for (var a = 1, o = this.nodes.length - 2; a < o; a++) {
        // 获取当前节点
        e = this.nodes[a];
        // 获取下一个节点
        t = this.nodes[a + 1];
        // 计算两个节点的中点 x 坐标（作为曲线终点）
        n = 0.5 * (e.x + t.x);
        // 计算两个节点的中点 y 坐标（作为曲线终点）
        i = 0.5 * (e.y + t.y);
        // 绘制二次贝塞尔曲线：从当前点到中点，控制点为当前节点
        ctx.quadraticCurveTo(e.x, e.y, n, i);
      }
      // 获取倒数第二个节点
      e = this.nodes[a];
      // 获取最后一个节点
      t = this.nodes[a + 1];
      // 绘制最后一段曲线：从倒数第二个节点到最后一个节点
      ctx.quadraticCurveTo(e.x, e.y, t.x, t.y);
      // 描边路径（实际绘制线条）
      ctx.stroke();
      // 关闭路径（虽然这里已经绘制完成，但保持代码完整性）
      ctx.closePath();
    },
  };

  // 鼠标移动事件处理函数：初始化事件监听和渲染
  // @param {Event} e - 鼠标或触摸事件对象
  function onMousemove(e) {
    // 内部函数：初始化所有轨迹线
    function o() {
      // 清空现有的线条数组
      lines = [];
      // 循环创建指定数量的轨迹线
      for (var e = 0; e < E.trails; e++)
        // 创建新线条，弹簧系数从 0.4 逐渐增加到 0.425
        lines.push(new Line({ spring: 0.4 + (e / E.trails) * 0.025 }));
    }
    // 内部函数：更新鼠标/触摸位置
    // @param {Event} e - 鼠标或触摸事件对象
    function c(e) {
      // 判断是否为触摸事件
      e.touches
        ? // 触摸事件：使用触摸点的页面坐标
          ((pos.x = e.touches[0].pageX), (pos.y = e.touches[0].pageY))
        : // 鼠标事件：使用鼠标的客户端坐标
          ((pos.x = e.clientX), (pos.y = e.clientY)),
        // 阻止默认行为（防止页面滚动等）
        e.preventDefault();
    }
    // 内部函数：处理触摸开始事件
    // @param {Event} e - 触摸事件对象
    function l(e) {
      // 如果只有一个触摸点
      1 == e.touches.length &&
        // 更新位置为触摸点的页面坐标
        ((pos.x = e.touches[0].pageX), (pos.y = e.touches[0].pageY));
    }
    // 移除旧的鼠标移动事件监听器（避免重复绑定）
    document.removeEventListener('mousemove', onMousemove),
      // 移除旧的触摸开始事件监听器（避免重复绑定）
      document.removeEventListener('touchstart', onMousemove),
      // 添加鼠标移动事件监听器
      document.addEventListener('mousemove', c),
      // 添加触摸移动事件监听器
      document.addEventListener('touchmove', c),
      // 添加触摸开始事件监听器
      document.addEventListener('touchstart', l),
      // 立即调用位置更新函数，处理当前事件
      c(e),
      // 初始化所有轨迹线
      o(),
      // 开始渲染循环
      render();
  }

  // 渲染函数：每一帧更新和绘制所有线条
  function render() {
    // 检查渲染是否正在运行
    if (ctx.running) {
      // 设置合成操作为源覆盖（用于清除画布）
      ctx.globalCompositeOperation = 'source-over';
      // 清除整个画布（从左上角到右下角）
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      // 设置合成操作为变亮模式（使多条线叠加时产生发光效果）
      ctx.globalCompositeOperation = 'lighter';
      // 设置描边样式：使用 HSL 颜色，色相由正弦波生成器动态计算
      ctx.strokeStyle = 'hsla(' + Math.round(f.update()) + ',50%,50%,0.2)';
      // 设置线条宽度为 1 像素
      ctx.lineWidth = 1;
      // 遍历所有轨迹线
      for (var e, t = 0; t < E.trails; t++) {
        // 获取当前线条
        (e = lines[t]).update();
        // 绘制当前线条
        e.draw();
      }
      // 增加帧计数器
      ctx.frame++;
      // 请求下一帧动画，继续渲染循环
      window.requestAnimationFrame(render);
    }
  }

  // 调整画布大小函数：根据窗口大小调整画布尺寸
  function resizeCanvas() {
    // 设置画布宽度为窗口宽度减去 20 像素（留出边距）
    ctx.canvas.width = window.innerWidth - 20;
    // 设置画布高度为窗口高度
    ctx.canvas.height = window.innerHeight;
  }

  // 声明 Canvas 上下文变量（用于绘制）
  let ctx,
    // 声明正弦波生成器实例变量
    f,
    // 声明临时变量（用于存储色相值）
    e = 0,
    // 声明线条数组（存储所有轨迹线）
    lines = [];
  // 声明鼠标位置对象
  const pos = {},
    // 配置对象：包含所有可调参数
    E = {
      // 调试模式开关
      debug: true,
      // 摩擦系数：控制线条运动的阻力，值越大阻力越大
      friction: 0.5,
      // 轨迹线数量：同时显示的线条数量
      trails: 20,
      // 每条线的节点数量：节点越多线条越平滑
      size: 50,
      // 阻尼系数：控制节点间速度传递的衰减
      dampening: 0.25,
      // 张力系数：控制后续节点对前一个节点的响应速度
      tension: 0.98,
    };
  // 节点构造函数：表示线条上的一个点
  function Node() {
    // 初始化节点的 x 坐标
    this.x = 0;
    // 初始化节点的 y 坐标
    this.y = 0;
    // 初始化节点的 y 方向速度
    this.vy = 0;
    // 初始化节点的 x 方向速度
    this.vx = 0;
  }

  // 渲染画布初始化函数：设置 Canvas 和事件监听
  const renderCanvas = function () {
    // 获取 Canvas 元素并获取 2D 渲染上下文
    ctx = document.getElementById('canvas').getContext('2d');
    // 设置渲染运行标志为 true
    ctx.running = true;
    // 初始化帧计数器为 1
    ctx.frame = 1;
    // 创建正弦波生成器实例，用于生成动态色相值
    f = new n({
      // 随机初始相位（0 到 2π）
      phase: Math.random() * 2 * Math.PI,
      // 振幅为 85（色相变化范围）
      amplitude: 85,
      // 频率为 0.0015（色相变化速度）
      frequency: 0.0015,
      // 偏移量为 285（基础色相值，在色相环上）
      offset: 285,
    });
    // 添加鼠标移动事件监听器（首次触发时初始化）
    document.addEventListener('mousemove', onMousemove);
    // 添加触摸开始事件监听器（首次触发时初始化）
    document.addEventListener('touchstart', onMousemove);
    // 添加设备方向改变事件监听器（横竖屏切换时调整画布）
    document.body.addEventListener('orientationchange', resizeCanvas);
    // 添加窗口大小改变事件监听器（窗口大小改变时调整画布）
    window.addEventListener('resize', resizeCanvas);
    // 添加窗口获得焦点事件监听器
    window.addEventListener('focus', () => {
      // 如果渲染未运行
      if (!ctx.running) {
        // 设置渲染运行标志为 true
        ctx.running = true;
        // 重新开始渲染
        render();
      }
    });
    // 添加窗口失去焦点事件监听器
    window.addEventListener('blur', () => {
      // 设置渲染运行标志为 true（保持运行，但可能被其他逻辑控制）
      ctx.running = true;
    });
    // 初始化画布大小
    resizeCanvas();
  };

  // React Hook：组件挂载时初始化，卸载时清理
  useEffect(() => {
    // 组件挂载时初始化画布
    renderCanvas();

    // 返回清理函数：组件卸载时执行
    return () => {
      // 停止渲染循环
      ctx.running = false;
      // 移除鼠标移动事件监听器
      document.removeEventListener('mousemove', onMousemove);
      // 移除触摸开始事件监听器
      document.removeEventListener('touchstart', onMousemove);
      // 移除设备方向改变事件监听器
      document.body.removeEventListener('orientationchange', resizeCanvas);
      // 移除窗口大小改变事件监听器
      window.removeEventListener('resize', resizeCanvas);
      // 移除窗口获得焦点事件监听器
      window.removeEventListener('focus', () => {
        // 如果渲染未运行
        if (!ctx.running) {
          // 设置渲染运行标志为 true
          ctx.running = true;
          // 重新开始渲染
          render();
        }
      });
      // 移除窗口失去焦点事件监听器
      window.removeEventListener('blur', () => {
        // 设置渲染运行标志为 true
        ctx.running = true;
      });
    };
    // 空依赖数组：只在组件挂载时执行一次
  }, []);
};

// 导出默认的 Hook 函数
export default useCanvasCursor;
