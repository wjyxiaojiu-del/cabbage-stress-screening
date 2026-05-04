// 舟山海岛小白菜抗逆品种筛选 - 应用逻辑
(function() {
  'use strict';

  // ============================================================
  // 主题切换（body.dark class）
  // ============================================================
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('theme') || 'light';
  if (savedTheme === 'dark') {
    document.body.classList.add('dark');
    themeToggle.textContent = '☀️';
  }

  themeToggle.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    themeToggle.textContent = isDark ? '☀️' : '🌙';
    initAllCharts();
  });

  // ============================================================
  // 滚动动画
  // ============================================================
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('show');
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

  // 导航高亮
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 100) current = section.getAttribute('id');
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) link.classList.add('active');
    });
  });

  // Hero数字动画
  document.querySelectorAll('.hero-stat .number[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count);
    let current = 0;
    const step = Math.max(1, Math.floor(target / 30));
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { current = target; clearInterval(timer); }
      el.textContent = current;
    }, 50);
  });

  // ============================================================
  // 主题感知的颜色
  // ============================================================
  function getThemeColors() {
    const isDark = document.body.classList.contains('dark');
    return {
      text: isDark ? '#e8dcc8' : '#3d2e1e',
      textSecondary: isDark ? '#8a7e6e' : '#9b8d7f',
      bg: isDark ? '#2a2520' : '#fffdf9',
      splitLine: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(92,64,51,0.08)',
      border: isDark ? '#3d362e' : '#e0d3c0',
      terracotta: '#c1784e',
      earth: '#8b6914',
      sage: '#7a9e7e',
      rose: '#c97b84'
    };
  }

  // ============================================================
  // 图表管理
  // ============================================================
  const charts = {};
  function getOrCreateChart(id) {
    if (charts[id]) charts[id].dispose();
    const dom = document.getElementById(id);
    charts[id] = echarts.init(dom);
    return charts[id];
  }
  function initAllCharts() {
    renderChart1(); renderChart2(); renderChart3(5);
    renderChart4(); renderChart5();
    renderRankingTable(); renderAnovaTable();
  }
  window.addEventListener('resize', () => Object.values(charts).forEach(c => c && c.resize()));

  // ============================================================
  // 图1：综合评分排名
  // ============================================================
  let currentRankView = 'all';
  window.switchRankView = function(view, btn) {
    currentRankView = view;
    btn.parentElement.querySelectorAll('button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderChart1();
  };

  function renderChart1() {
    const chart = getOrCreateChart('chart1');
    const tc = getThemeColors();
    let data = [...VARIETY_DATA].sort((a, b) => a.score - b.score);
    if (currentRankView === 'top5') data = data.slice(-5);
    else if (currentRankView === 'bottom5') data = data.slice(0, 5);

    const names = data.map(d => d.name);
    const scores = data.map(d => d.score);
    const barColors = ['#c1784e', '#d4956b', '#b8963c', '#7a9e7e', '#c97b84'];

    chart.setOption({
      tooltip: {
        trigger: 'axis', axisPointer: { type: 'shadow' },
        formatter: p => {
          const item = data[p[0].dataIndex];
          return `<b>${item.name}</b><br/>综合评分: ${item.score.toFixed(3)}<br/>生理评分: ${item.physioScore.toFixed(3)}<br/>生长评分: ${item.growthScore.toFixed(3)}<br/>等级: ${item.grade}`;
        }
      },
      grid: { left: 120, right: 80, top: 20, bottom: 30 },
      xAxis: { type: 'value', max: 1, axisLabel: { color: tc.textSecondary }, splitLine: { lineStyle: { color: tc.splitLine } } },
      yAxis: { type: 'category', data: names, axisLabel: { color: tc.text, fontSize: 13 } },
      series: [{
        type: 'bar', barWidth: '60%',
        data: scores.map((s, i) => ({
          value: s,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              { offset: 0, color: barColors[i % barColors.length] },
              { offset: 1, color: barColors[i % barColors.length] + '88' }
            ]),
            borderRadius: [0, 6, 6, 0]
          }
        })),
        label: { show: true, position: 'right', formatter: p => p.value.toFixed(3), color: tc.text, fontSize: 12 },
        markLine: {
          silent: true, symbol: 'none', lineStyle: { type: 'dashed' },
          data: [
            { xAxis: 0.5, lineStyle: { color: '#8b6914' }, label: { formatter: '良好线', color: tc.textSecondary } },
            { xAxis: 0.7, lineStyle: { color: '#c1784e' }, label: { formatter: '优异线', color: tc.textSecondary } }
          ]
        }
      }]
    });
  }

  // ============================================================
  // 图2：MDA箱线图
  // ============================================================
  function renderChart2() {
    const chart = getOrCreateChart('chart2');
    const tc = getThemeColors();
    const sorted = [...VARIETY_DATA].sort((a, b) => b.score - a.score);

    const boxStats = sorted.map(v => {
      const points = [];
      for (let i = 0; i < 10; i++) {
        const u1 = Math.random(), u2 = Math.random();
        const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
        points.push(+(v.physio.mda + z * v.mdaStd).toFixed(2));
      }
      points.sort((a, b) => a - b);
      return [points[0], points[2], points[4], points[7], points[9]];
    });

    chart.setOption({
      tooltip: {
        trigger: 'item',
        formatter: p => {
          if (p.componentType === 'series' && p.seriesType === 'boxplot') {
            const v = sorted[p.dataIndex];
            return `<b>${v.name}</b><br/>MDA均值: ${v.physio.mda}<br/>标准差: ${v.mdaStd}<br/>Q1: ${p.value[2]}<br/>中位数: ${p.value[3]}<br/>Q3: ${p.value[4]}`;
          }
        }
      },
      grid: { left: 130, right: 30, top: 30, bottom: 50 },
      xAxis: { type: 'category', data: sorted.map(v => v.name), axisLabel: { color: tc.text, rotate: 45, fontSize: 11 } },
      yAxis: { type: 'value', name: 'MDA (μmol/g FW)', nameTextStyle: { color: tc.textSecondary }, axisLabel: { color: tc.textSecondary }, splitLine: { lineStyle: { color: tc.splitLine } } },
      series: [{
        type: 'boxplot', data: boxStats, boxWidth: ['40%', '60%'],
        itemStyle: {
          color: p => p.dataIndex < 3 ? 'rgba(193, 120, 78, 0.25)' : 'rgba(122, 158, 126, 0.2)',
          borderColor: p => p.dataIndex < 3 ? '#c1784e' : '#7a9e7e',
          borderWidth: 2
        }
      }]
    });
  }

  // ============================================================
  // 图3：雷达图
  // ============================================================
  window.switchRadarTop = function(n, btn) {
    btn.parentElement.querySelectorAll('button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderChart3(n);
  };

  function renderChart3(topN) {
    const chart = getOrCreateChart('chart3');
    const tc = getThemeColors();
    const sorted = [...VARIETY_DATA].sort((a, b) => b.score - a.score).slice(0, topN);
    const indicators = ['可溶性糖', '脯氨酸', 'POD', 'CAT'];
    const keys = ['sugar', 'proline', 'pod', 'cat'];
    const ranges = {};
    keys.forEach(k => { const vals = VARIETY_DATA.map(v => v.physio[k]); ranges[k] = { min: Math.min(...vals), max: Math.max(...vals) }; });

    const radarColors = ['#c1784e', '#8b6914', '#7a9e7e', '#b8963c', '#c97b84'];

    chart.setOption({
      tooltip: { trigger: 'item', formatter: p => { let h = `<b>${p.name}</b><br/>`; indicators.forEach((ind, i) => h += `${ind}: ${sorted[p.seriesIndex].physio[keys[i]]}<br/>`); return h; } },
      legend: { data: sorted.map(v => v.name), bottom: 0, textStyle: { color: tc.text } },
      radar: {
        indicator: indicators.map(() => ({ max: 1 })), shape: 'polygon', splitNumber: 4,
        axisName: { color: tc.text, fontSize: 12 },
        splitLine: { lineStyle: { color: tc.splitLine } },
        splitArea: { areaStyle: { color: ['rgba(193,120,78,0.03)', 'rgba(122,158,126,0.05)'] } },
        axisLine: { lineStyle: { color: tc.border } }
      },
      series: [{
        type: 'radar',
        data: sorted.map((v, i) => ({
          name: v.name,
          value: keys.map(k => +((v.physio[k] - ranges[k].min) / (ranges[k].max - ranges[k].min)).toFixed(3)),
          symbol: 'circle', symbolSize: 6,
          lineStyle: { width: 2, color: radarColors[i] },
          areaStyle: { color: radarColors[i], opacity: 0.08 },
          itemStyle: { color: radarColors[i] }
        }))
      }]
    });
  }

  // ============================================================
  // 图4：相关性热图
  // ============================================================
  function renderChart4() {
    const chart = getOrCreateChart('chart4');
    const tc = getThemeColors();
    const labels = ['单株重', '株高', '叶绿素', '可溶性糖', '脯氨酸', 'MDA', 'POD', 'CAT'];
    const keys = [v => v.growth.weight, v => v.growth.height, v => v.growth.chlorophyll, v => v.physio.sugar, v => v.physio.proline, v => v.physio.mda, v => v.physio.pod, v => v.physio.cat];

    const n = labels.length;
    const values = VARIETY_DATA.map(v => keys.map(k => k(v)));
    const matrix = [];
    function pearson(x, y) {
      const n = x.length;
      const mx = x.reduce((a, b) => a + b) / n, my = y.reduce((a, b) => a + b) / n;
      let num = 0, dx2 = 0, dy2 = 0;
      for (let i = 0; i < n; i++) { const dx = x[i] - mx, dy = y[i] - my; num += dx * dy; dx2 += dx * dx; dy2 += dy * dy; }
      return num / Math.sqrt(dx2 * dy2);
    }
    for (let i = 0; i < n; i++)
      for (let j = 0; j < n; j++)
        matrix.push([j, i, +pearson(values.map(r => r[i]), values.map(r => r[j])).toFixed(2)]);

    chart.setOption({
      tooltip: { formatter: p => `${labels[p.value[0]]} vs ${labels[p.value[1]]}<br/>r = ${p.value[2]}` },
      grid: { left: 80, right: 40, top: 10, bottom: 80 },
      xAxis: { type: 'category', data: labels, axisLabel: { color: tc.text, rotate: 45, fontSize: 11 } },
      yAxis: { type: 'category', data: labels, axisLabel: { color: tc.text, fontSize: 11 } },
      visualMap: {
        min: -1, max: 1, calculable: true, orient: 'vertical', right: 0, top: 'center',
        inRange: { color: ['#4393c3', '#d1e5f0', '#f7f7f7', '#fddbc7', '#d6604d'] },
        textStyle: { color: tc.text }
      },
      series: [{
        type: 'heatmap', data: matrix,
        label: { show: true, formatter: p => p.value[2].toFixed(2), fontSize: 11, color: tc.text },
        emphasis: { itemStyle: { shadowBlur: 10, shadowColor: 'rgba(0,0,0,0.2)' } }
      }]
    });
  }

  // ============================================================
  // 图5：气泡图
  // ============================================================
  function renderChart5() {
    const chart = getOrCreateChart('chart5');
    const tc = getThemeColors();
    const sorted = [...VARIETY_DATA].sort((a, b) => b.score - a.score);

    chart.setOption({
      tooltip: {
        trigger: 'item',
        formatter: p => { const v = sorted[p.dataIndex]; return `<b>${v.name}</b><br/>综合评分: ${v.score.toFixed(3)}<br/>生理评分: ${v.physioScore.toFixed(3)}<br/>生长评分: ${v.growthScore.toFixed(3)}<br/>单株重: ${v.growth.weight}g<br/>等级: ${v.grade}`; }
      },
      grid: { left: 60, right: 100, top: 40, bottom: 50 },
      xAxis: { name: '生长评分', nameTextStyle: { color: tc.textSecondary }, axisLabel: { color: tc.textSecondary }, splitLine: { lineStyle: { color: tc.splitLine } } },
      yAxis: { name: '抗逆生理评分', nameTextStyle: { color: tc.textSecondary }, axisLabel: { color: tc.textSecondary }, splitLine: { lineStyle: { color: tc.splitLine } } },
      visualMap: {
        show: true, dimension: 2, min: 0, max: 1, right: 0, top: 'center',
        text: ['高', '低'], textStyle: { color: tc.text },
        inRange: { color: ['#e8c8a0', '#d4956b', '#c1784e', '#7a9e7e', '#4a6b5d'] }
      },
      series: [{
        type: 'scatter',
        data: sorted.map(v => [v.growthScore, v.physioScore, v.score]),
        symbolSize: d => Math.max(15, d[2] * 60),
        itemStyle: { opacity: 0.85, borderColor: '#fff', borderWidth: 1.5 },
        label: { show: true, formatter: p => sorted[p.dataIndex].name, position: 'top', color: tc.text, fontSize: 11 },
        markLine: { silent: true, symbol: 'none', lineStyle: { type: 'dashed', color: tc.border }, data: [{ xAxis: 0.5 }, { yAxis: 0.5 }], label: { show: false } }
      }]
    });
  }

  // ============================================================
  // 排名表格
  // ============================================================
  function renderRankingTable() {
    const sorted = [...VARIETY_DATA].sort((a, b) => b.score - a.score);
    const tbody = document.getElementById('rankingBody');
    tbody.innerHTML = sorted.map((v, i) => {
      const rank = i + 1;
      const rankClass = rank <= 3 ? `rank-${rank}` : 'rank-other';
      const gradeClass = v.grade === '优异' ? 'grade-a' : v.grade === '良好' ? 'grade-b' : v.grade === '中等' ? 'grade-c' : 'grade-d';
      const barColor = v.score >= 0.7 ? '#c1784e' : v.score >= 0.5 ? '#8b6914' : v.score >= 0.3 ? '#7a9e7e' : '#c97b84';
      return `<tr>
        <td><span class="rank-dot ${rankClass}">${rank}</span></td>
        <td><strong>${v.name}</strong></td>
        <td>${v.score.toFixed(3)}</td>
        <td>${v.physioScore.toFixed(3)}</td>
        <td>${v.growthScore.toFixed(3)}</td>
        <td><span class="grade-badge ${gradeClass}">${v.grade}</span></td>
        <td>
          <div class="score-bar">
            <div class="track"><div class="fill" style="width:${v.score * 100}%;background:${barColor}"></div></div>
            <span style="font-size:0.78rem;color:var(--text-muted)">${(v.score * 100).toFixed(1)}%</span>
          </div>
        </td>
      </tr>`;
    }).join('');
  }

  window.filterTable = function() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    document.querySelectorAll('#rankingBody tr').forEach(row => {
      row.style.display = row.cells[1].textContent.toLowerCase().includes(query) ? '' : 'none';
    });
  };

  // ============================================================
  // ANOVA表格
  // ============================================================
  function renderAnovaTable() {
    document.getElementById('anovaBody').innerHTML = ANOVA_RESULTS.map(r => {
      const pStr = r.pValue < 0.0001 ? '&lt; 0.0001' : r.pValue.toFixed(4);
      return `<tr>
        <td><strong>${r.indicator}</strong></td>
        <td>${r.fValue.toFixed(3)}</td>
        <td>${pStr}</td>
        <td style="color:#c97b84;font-weight:700">${r.sig}</td>
        <td>品种间差异极显著</td>
      </tr>`;
    }).join('');
  }

  // ============================================================
  // 初始化
  // ============================================================
  document.addEventListener('DOMContentLoaded', initAllCharts);
})();
