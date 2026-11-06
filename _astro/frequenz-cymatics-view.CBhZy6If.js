import{n as e}from"./rolldown-runtime.B8xr6ykz.js";import{n as t,t as n}from"./frequenz-nav.Csiash2p.js";function r(e,t){if(!Number.isInteger(e)||!Number.isInteger(t))throw RangeError(`Die Modenzahlen n und m müssen ganze Zahlen sein.`);if(e<1||e>12||t<1||t>12)throw RangeError(`Die Modenzahlen liegen zwischen 1 und 12.`);if(e===t)throw RangeError(`n = m ist in dieser Modellfamilie entartet: das Feld ist überall null.`);return Object.freeze({n:e,m:t})}function i(e,t,n,r){let i=Math.PI*e*n,a=Math.PI*t*r,o=Math.PI*t*n,s=Math.PI*e*r;return Math.cos(i)*Math.cos(a)-Math.cos(o)*Math.cos(s)}function a(e,t,n=200){r(e,t);let a=Math.max(2,Math.min(600,Math.floor(n))),o=a+1,s=new Float32Array(o*o),c=0;for(let n=0;n<o;n+=1){let r=n/a;for(let l=0;l<o;l+=1){let u=i(e,t,l/a,r);Math.abs(u)>c&&(c=Math.abs(u)),s[n*o+l]=u}}let l=c>0?c:1;for(let e=0;e<s.length;e+=1)s[e]/=l;return Object.freeze({n:e,m:t,cells:a,size:o,values:s,range:c})}function o(e,t,n=2048){r(e,t);let a=e=>{let t=0,r=0,i=!0;for(let a=0;a<=n;a+=1){let o=e(a/n);if(Math.abs(o)<1e-12)continue;i=!1;let s=o>0?1:-1;r!==0&&s!==r&&(t+=1),r=s}return{crossings:t,zerosOnly:i}},o=a(n=>i(e,t,n,.5)),s=a(n=>i(e,t,.5,n));return Object.freeze({horizontal:o.crossings,vertical:s.crossings,horizontalIsNodeLine:o.zerosOnly,verticalIsNodeLine:s.zerosOnly})}function s(e,t){r(e,t);let n=e%2==t%2;return Object.freeze({mirrorSymmetric:n,rotationSymmetric:!0,fieldRotationSymmetric:n,label:n?`die Knotenlinien sind zu beiden Mittelachsen spiegelsymmetrisch und 180°-drehsymmetrisch, das Feld ist ebenfalls drehsymmetrisch`:`die Knotenlinien sind 180°-drehsymmetrisch, aber nicht spiegelsymmetrisch; bei dieser Drehung wechselt das Feld das Vorzeichen und damit die Farbe`})}function c(e,t){r(e,t);let n=s(e,t),i=o(e,t),a=(e,t,n)=>e?`die ${n} Mittelachse liegt vollständig auf einer Knotenlinie`:`${t} Nulldurchgänge auf der ${n}en Mittelachse`;return Object.freeze({n:e,m:t,symmetry:n,midline:i,label:`Modus n = ${e}, m = ${t}`,text:`Modus n = ${e}, m = ${t}: ${a(i.horizontalIsNodeLine,i.horizontal,`waagerecht`)}, ${a(i.verticalIsNodeLine,i.vertical,`senkrecht`)}; ${n.label}.`})}function l(e){let{cells:t,size:n,values:r}=e,i=[],a=(e,t)=>r[t*n+e];for(let e=0;e<t;e+=1)for(let n=0;n<t;n+=1){let r=a(n,e),o=a(n+1,e),s=a(n+1,e+1),c=a(n,e+1),l=[];r<0!=o<0&&l.push([n+r/(r-o),e]),o<0!=s<0&&l.push([n+1,e+o/(o-s)]),c<0!=s<0&&l.push([n+c/(c-s),e+1]),r<0!=c<0&&l.push([n,e+r/(r-c)]);for(let e=0;e+1<l.length;e+=2)i.push({x1:l[e][0]/t,y1:l[e][1]/t,x2:l[e+1][0]/t,y2:l[e+1][1]/t})}return i}var u,d,f,p=e((()=>{u=`idealisiertes Rechteckmodell, freie Ränder (Differenzform)`,d=Object.freeze({n:2,m:3}),f=Object.freeze({n:3,m:4})}));function m(e){let t=``;for(let n=1;n<=12;n+=1)t+=`<option value="${n}"${n===e?` selected`:``}>${n}</option>`;return t}function h(e,t){let n=/^#?([0-9a-f]{6})$/i.exec(String(e||``).trim());if(!n)return t;let r=parseInt(n[1],16);return[r>>16&255,r>>8&255,r&255]}function g(e){return`rgb(${e[0]}, ${e[1]}, ${e[2]})`}function _(e,t,n){let r=Math.max(0,Math.min(1,n));return[Math.round(e[0]+(t[0]-e[0])*r),Math.round(e[1]+(t[1]-e[1])*r),Math.round(e[2]+(t[2]-e[2])*r)]}var v,y;e((()=>{p(),n(),v=200,y=class{constructor(e,{reducedMotion:t=!1,meditation:n=!1}={}){this.root=e,this.reducedMotion=!!t,this.meditation=!!n,this.modes={a:{...d},b:{...f}},this.showNodes=!0,this.refs={},this.palette=null,this.resizeTimer=0,this.onResize=()=>{clearTimeout(this.resizeTimer),this.resizeTimer=setTimeout(()=>this.drawAll(),150)}}navHtml(){return t(`cymatics`,{cymatics:!0,meditation:this.meditation})}render(){this.root.innerHTML=`
      ${this.navHtml()}
      <p class="fq-notice" id="fqCyNotice" role="status" hidden></p>
      <section class="fq-section" aria-labelledby="fqCyTitle">
        <div class="fq-section-head">
          <h2 id="fqCyTitle">Chladni-Muster auf einer idealisierten Platte</h2>
          <p class="label">Modell · keine Frequenzzuordnung</p>
        </div>
        <p class="fq-lede">
          Knotenlinien entstehen dort, wo eine schwingende Platte in Ruhe bleibt. Die Bilder hier folgen einer
          Modellfunktion für eine quadratische Platte mit freien Rändern. Gewählt werden die Modenzahlen n und m –
          nicht eine Frequenz.
        </p>
        <p class="fq-note">
          Modell: <span class="fq-mono">f(u,v) = cos(nπu)·cos(mπv) − cos(mπu)·cos(nπv)</span>, ${u}.
        </p>
      </section>
      <div class="fq-figures">
        <figure class="fq-figure">
          <figcaption class="fq-figure-title">Muster A</figcaption>
          <canvas id="fqCyCanvasA" class="fq-square" width="360" height="360" aria-hidden="true"></canvas>
          <div class="fq-figure-controls">
            <label class="fq-field" for="fqCyNA">n (A)</label>
            <select id="fqCyNA" class="select">${m(this.modes.a.n)}</select>
            <label class="fq-field" for="fqCyMA">m (A)</label>
            <select id="fqCyMA" class="select">${m(this.modes.a.m)}</select>
          </div>
          <p class="fq-figcaption" id="fqCyTextA"></p>
        </figure>
        <figure class="fq-figure">
          <figcaption class="fq-figure-title">Muster B zum Vergleich</figcaption>
          <canvas id="fqCyCanvasB" class="fq-square" width="360" height="360" aria-hidden="true"></canvas>
          <div class="fq-figure-controls">
            <label class="fq-field" for="fqCyNB">n (B)</label>
            <select id="fqCyNB" class="select">${m(this.modes.b.n)}</select>
            <label class="fq-field" for="fqCyMB">m (B)</label>
            <select id="fqCyMB" class="select">${m(this.modes.b.m)}</select>
          </div>
          <p class="fq-figcaption" id="fqCyTextB"></p>
        </figure>
      </div>
      <div class="fq-chladni-options">
        <label class="fq-check" for="fqCyNodes">
          <input type="checkbox" id="fqCyNodes" checked />
          <span>Knotenlinien hervorheben</span>
        </label>
        <p class="fq-note" id="fqCyMotionNote" ${this.reducedMotion?``:`hidden`}>
          Statische Darstellung: Die Muster werden nur bei einer Änderung neu gezeichnet, nie animiert.
        </p>
      </div>
      <p class="fq-error" id="fqCyError" role="alert" hidden></p>
      <section class="fq-section" aria-labelledby="fqCyLimitsTitle">
        <h2 id="fqCyLimitsTitle">Was dieses Modell nicht aussagt</h2>
        <ul class="fq-prose fq-list">
          <li>Es gibt <strong>keine</strong> Zuordnung „Frequenz X erzeugt Muster Y“: die Modenform hängt von Geometrie, Material, Dicke und Halterung ab.</li>
          <li>Die Anregungsfrequenz einer realen Platte wird hier nicht berechnet; die Modenzahlen sind keine Hertz-Werte.</li>
          <li>Reale Chladni-Figuren weichen ab, weil Ränder nicht ideal frei sind und die Platte endlich dick ist.</li>
          <li>Die Bilder sind eine Modellrechnung, keine Messung und keine künstlerische Simulation.</li>
        </ul>
      </section>
    `;let e=e=>document.getElementById(e);this.refs={canvasA:e(`fqCyCanvasA`),canvasB:e(`fqCyCanvasB`),nA:e(`fqCyNA`),mA:e(`fqCyMA`),nB:e(`fqCyNB`),mB:e(`fqCyMB`),nodes:e(`fqCyNodes`),textA:e(`fqCyTextA`),textB:e(`fqCyTextB`),error:e(`fqCyError`),notice:e(`fqCyNotice`)},this.palette=null,this.bind(),this.drawAll(),window.addEventListener(`resize`,this.onResize)}bind(){let e=e=>{let t=Number(this.refs[`n${e.toUpperCase()}`].value),n=Number(this.refs[`m${e.toUpperCase()}`].value);this.modes[e]={n:t,m:n},this.update(e)};this.refs.nA.addEventListener(`change`,()=>e(`a`)),this.refs.mA.addEventListener(`change`,()=>e(`a`)),this.refs.nB.addEventListener(`change`,()=>e(`b`)),this.refs.mB.addEventListener(`change`,()=>e(`b`)),this.refs.nodes.addEventListener(`change`,()=>{this.showNodes=this.refs.nodes.checked,this.drawAll()})}update(e){let t=this.modes[e],n=this.refs[`canvas${e.toUpperCase()}`],i=this.refs[`text${e.toUpperCase()}`];try{r(t.n,t.m)}catch(e){let t=e&&e.message?e.message:`Diese Modenkombination ist nicht darstellbar.`;n&&n.getContext(`2d`).clearRect(0,0,n.width,n.height),i&&(i.textContent=`Kein Bild: ${t}`),this.refs.error&&(this.refs.error.textContent=`${t} Bitte für n und m verschiedene Werte wählen.`,this.refs.error.hidden=!1);return}this.refs.error&&(this.refs.error.hidden=!0),i&&(i.textContent=c(t.n,t.m).text),this.draw(e)}drawAll(){this.update(`a`),this.update(`b`)}draw(e){let t=this.modes[e],n=this.refs[`canvas${e.toUpperCase()}`];if(!n||!n.getContext)return;let r=n.getContext(`2d`),i=a(t.n,t.m,v),o=this.palette||this.readPalette(n);this.palette=o;let s=Math.min(typeof devicePixelRatio==`number`?devicePixelRatio:1,2),c=Math.max(120,Math.round(n.clientWidth||360));(n.width!==Math.round(c*s)||n.height!==n.width)&&(n.width=Math.round(c*s),n.height=n.width);let u=n.width;r.clearRect(0,0,u,u),r.fillStyle=g(o.background),r.fillRect(0,0,u,u),r.imageSmoothingEnabled=!0;let d=i.cells,f=document.createElement(`canvas`);f.width=d,f.height=d;let p=f.getContext(`2d`),m=p.createImageData(d,d);for(let e=0;e<d;e+=1)for(let t=0;t<d;t+=1){let n=i.values[e*i.size+t],r=Math.min(1,Math.abs(n)),a=n>=0?_(o.background,o.primary,.08+.34*r):_(o.background,o.muted,.05+.2*r),s=(e*d+t)*4;m.data[s]=a[0],m.data[s+1]=a[1],m.data[s+2]=a[2],m.data[s+3]=255}if(p.putImageData(m,0,0),r.drawImage(f,0,0,d,d,0,0,u,u),this.showNodes){r.strokeStyle=g(o.primary),r.lineWidth=Math.max(1,s),r.lineCap=`round`,r.beginPath();for(let e of l(i))r.moveTo(e.x1*u,e.y1*u),r.lineTo(e.x2*u,e.y2*u);r.stroke()}}readPalette(e){let t={background:`#0b1012`,primary:`#c6b38e`,muted:`#82928e`};if(typeof getComputedStyle!=`function`||!e)return t;let n=getComputedStyle(e),r=(e,t)=>h(n.getPropertyValue(e),h(t,[0,0,0]));return{background:r(`--color-bg-deep`,t.background),primary:r(`--color-primary`,t.primary),muted:r(`--color-line-strong`,t.muted)}}dispose(){clearTimeout(this.resizeTimer),window.removeEventListener(`resize`,this.onResize),this.refs={},this.palette=null}}}))();export{y as CymaticsView};