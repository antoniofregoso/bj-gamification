import { FunnelElement } from "./FunnelElement";

export class DiscountCoupon extends FunnelElement {

    #default = {
        clientName:"Laslo Losla",
        colors:{
            brandBg:"#00ff00",
            brandText:"#000000",
            discountBg:"#ffff00",
            discountText:"#000000",
            discountAttention:"#ff00ff",
            codeBg:"#008080",
            codeText:"#ffffff"
        }
    }

    constructor(props={}){
        super();
        this.state =this.initState(this.#default,props);
        this.setAttribute("id",this.state.id||`component-${Math.floor(Math.random() * 100)}`);
        this.setAttribute("value",this.state.value||'closed');
        this.classList.add('modal')
        if (this.state.value==='open'){
            this.classList.add('is-active');
        }
    }

    static get observedAttributes() { return ['value']; }

    attributeChangedCallback(name, old, now) {
        if (now==='open'){
            this.state.value = 'open';
            this.classList.add('is-active');
            this.querySelector('input').value = '';
        }else if (now==='closed'){
            this.state.value = 'closed';
            this.classList.remove('is-active');
        }
    }

    couponCode(){
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        var code = '';
        for (var i = 0; i < 12; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return code;
    }



    renderCoupon(){
        const dueDate = new Date(this.state.dueDate);
        let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        this.state.date = dueDate.toLocaleDateString('es', options).toUpperCase();
        let minutes = dueDate.getMinutes()<10?dueDate.getMinutes() + '0':dueDate.getMinutes();
        let hours = dueDate.getHours()<10?dueDate.getHours() + '0':dueDate.getHours();
        this.state.time = hours + ':' + minutes;
        this.state.code = this.couponCode();
        this.setAttribute("coupon", this.state.code)
        let couponSvg = /* svg */`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
        <svg
           width="210mm"
           height="148mm"
           viewBox="0 0 210 148"
           version="1.1"
           id="svg893"
           inkscape:version="1.1.2 (0a00cf5339, 2022-02-04)"
           sodipodi:docname="cupon 2.svg"
           inkscape:export-filename="/home/antoniofregoso/bitmap.png"
           inkscape:export-xdpi="90"
           inkscape:export-ydpi="90"
           xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
           xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
           xmlns="http://www.w3.org/2000/svg"
           xmlns:svg="http://www.w3.org/2000/svg">
          <sodipodi:namedview
             id="namedview895"
             pagecolor="#505050"
             bordercolor="#eeeeee"
             borderopacity="1"
             inkscape:pageshadow="0"
             inkscape:pageopacity="0"
             inkscape:pagecheckerboard="0"
             inkscape:document-units="mm"
             showgrid="false"
             inkscape:zoom="1.2650112"
             inkscape:cx="516.59621"
             inkscape:cy="266.79605"
             inkscape:window-width="1680"
             inkscape:window-height="986"
             inkscape:window-x="0"
             inkscape:window-y="0"
             inkscape:window-maximized="1"
             inkscape:current-layer="layer1" />
          <defs
             id="defs890" />
          <g
             inkscape:label="Capa 1"
             inkscape:groupmode="layer"
             id="layer1">
            <rect
               style="fill:#ffffff;stroke:none;stroke-width:1.06362"
               id="rect8060"
               width="209.54997"
               height="147.07474"
               x="0.53180915"
               y="0.53180915" />
            <rect
               style="fill:#ffffff;stroke:none;stroke-width:1.05833"
               id="rect8751"
               width="188.44463"
               height="131.79166"
               x="10.448421"
               y="7.3242621" />
            <rect
               style="fill:#3771c8;stroke:#000000;stroke-width:1;stroke-miterlimit:4;stroke-dasharray:6, 2;stroke-dashoffset:0;stroke-opacity:1"
               id="rect8777"
               width="188.44461"
               height="131.79166"
               x="10.448436"
               y="7.3242621"
               ry="13.03439" />
            <text
               xml:space="preserve"
               style="font-style:normal;font-variant:normal;font-weight:500;font-stretch:normal;font-size:10.5833px;line-height:1.25;font-family:Montserrat;-inkscape-font-specification:'Montserrat Medium';fill:#ffffff;stroke-width:0.264583"
               x="55.387272"
               y="40.772766"
               id="text26379"><tspan
                 sodipodi:role="line"
                 id="tspan26377"
                 style="font-style:normal;font-variant:normal;font-weight:500;font-stretch:normal;font-family:Montserrat;-inkscape-font-specification:'Montserrat Medium';fill:#ffffff;stroke-width:0.264583"
                 x="55.387272"
                 y="40.772766">Remate y Liquidación</tspan></text>
            <text
               xml:space="preserve"
               style="font-weight:800;font-size:12.5825px;line-height:1.25;font-family:Montserrat;-inkscape-font-specification:'Montserrat Ultra-Bold';fill:#1a1a1a;fill-opacity:1;stroke-width:0.314565"
               x="70.639633"
               y="64.705734"
               id="text33347"><tspan
                 sodipodi:role="line"
                 id="tspan33345"
                 style="fill:#1a1a1a;fill-opacity:1;stroke-width:0.314565"
                 x="70.639633"
                 y="64.705734">$ 3,990.00</tspan></text>
            <rect
               style="fill:#1a1a1a;fill-opacity:1;stroke:none;stroke-width:0.75429;stroke-miterlimit:4;stroke-dasharray:4.52574, 1.50858;stroke-dashoffset:0;stroke-opacity:1"
               id="rect34979"
               width="109.45312"
               height="18.78496"
               x="50.005272"
               y="78.763596"
               ry="9.3924799" />
            <text
               xml:space="preserve"
               style="font-weight:800;font-size:10.5833px;line-height:1.25;font-family:Montserrat;-inkscape-font-specification:'Montserrat Ultra-Bold';fill:#ffffff;stroke-width:0.264583"
               x="59.668224"
               y="91.941269"
               id="text36111"><tspan
                 sodipodi:role="line"
                 id="tspan36109"
                 style="fill:#ffffff;stroke-width:0.264583"
                 x="59.668224"
                 y="91.941269">${this.state.code}</tspan></text>
            <text
               xml:space="preserve"
               style="font-style:normal;font-variant:normal;font-weight:500;font-stretch:normal;font-size:5.63802px;line-height:1.25;font-family:Montserrat;-inkscape-font-specification:'Montserrat Medium';fill:#ffffff;stroke-width:0.140951"
               x="53.46822"
               y="118.49345"
               id="text41244"><tspan
                 sodipodi:role="line"
                 id="tspan41242"
                 style="font-style:normal;font-variant:normal;font-weight:500;font-stretch:normal;font-family:Montserrat;-inkscape-font-specification:'Montserrat Medium';fill:#ffffff;stroke-width:0.140951"
                 x="53.46822"
                 y="118.49345">Válido Hasta el 14 de Mayo a las 19:00</tspan></text>
            <text
               xml:space="preserve"
               style="font-weight:800;font-size:10.5833px;line-height:1.25;font-family:Montserrat;-inkscape-font-specification:'Montserrat Ultra-Bold';stroke-width:0.264583"
               x="16.445215"
               y="120.52507"
               id="text59356"><tspan
                 sodipodi:role="line"
                 id="tspan59354"
                 style="stroke-width:0.264583"
                 x="16.445215"
                 y="120.52507" /></text>
            <text
               xml:space="preserve"
               style="font-style:normal;font-variant:normal;font-weight:600;font-stretch:normal;font-size:5.2px;line-height:1.25;font-family:Montserrat;-inkscape-font-specification:'Montserrat Semi-Bold';fill:#1a1a1a;stroke-width:0.148276"
               x="18.924717"
               y="134.37987"
               id="text61736"><tspan
                 sodipodi:role="line"
                 style="font-style:normal;font-variant:normal;font-weight:600;font-stretch:normal;font-family:Montserrat;-inkscape-font-specification:'Montserrat Semi-Bold';fill:#1a1a1a;stroke-width:0.148276"
                 x="18.924717"
                 y="134.37987"
                 id="tspan61738">Carretera Picacho Ajusco 531 Lomas de Padierna Tlalpan</tspan></text>
            <text
               xml:space="preserve"
               style="font-weight:800;font-size:6.62818px;line-height:1.25;font-family:Montserrat;-inkscape-font-specification:'Montserrat Ultra-Bold';fill:#1a1a1a;fill-opacity:1;stroke-width:0.165705"
               x="60.979282"
               y="126.65549"
               id="text65024"><tspan
                 sodipodi:role="line"
                 id="tspan65022"
                 style="fill:#1a1a1a;fill-opacity:1;stroke-width:0.165705"
                 x="60.979282"
                 y="126.65549">PRESENTAR EN BODEGA</tspan></text>
            <text
               xml:space="preserve"
               style="font-weight:800;font-size:6.76648px;line-height:1.25;font-family:Montserrat;-inkscape-font-specification:'Montserrat Ultra-Bold';text-align:center;text-anchor:middle;fill:#ffffff;stroke-width:0.169162"
               x="104.70815"
               y="51.370396"
               id="text118781"><tspan
                 sodipodi:role="line"
                 style="text-align:center;text-anchor:middle;fill:#ffffff;stroke-width:0.169162"
                 x="104.70815"
                 y="51.370396"
                 id="tspan118783">Cualquier Mueble de Diseño por tan solo</tspan></text>
            <path
               style="fill:#ffffff;stroke:none;stroke-width:0.265102px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
               d="M 10.801083,28.418412 197.62791,28.233767 c 2.23035,-6.967164 1.01487,-13.750927 -6.92267,-20.1769137 L 19.893241,7.5789017 C 12.820937,10.792144 10.240902,17.28905 10.801083,28.418412 Z"
               id="path139367"
               sodipodi:nodetypes="ccccc" />
            <text
               xml:space="preserve"
               style="font-style:normal;font-variant:normal;font-weight:600;font-stretch:normal;font-size:8.27373px;line-height:1.25;font-family:Montserrat;-inkscape-font-specification:'Montserrat Semi-Bold';fill:#1a1a1a;stroke-width:0.206844"
               x="16.788668"
               y="20.942804"
               id="text49892"><tspan
                 sodipodi:role="line"
                 id="tspan49890"
                 style="font-style:normal;font-variant:normal;font-weight:600;font-stretch:normal;font-family:Montserrat;-inkscape-font-specification:'Montserrat Semi-Bold';fill:#1a1a1a;stroke-width:0.206844"
                 x="16.788668"
                 y="20.942804">CUPÓN DE REMATE</tspan></text>
            <g
               inkscape:label="Capa 1"
               id="layer1-3"
               transform="matrix(0.57139637,0,0,0.57139637,115.41468,-3.8926595)">
              <path
                 inkscape:connector-curvature="0"
                 id="path2111"
                 d="M 10.337255,50.152838 C 8.6907729,49.256381 7.3828384,47.213945 7.3748284,45.526722 7.3674161,44.130948 7.9896724,42.2116 8.4482715,42.2116 c 0.3618114,0 0.3965955,0.259865 0.3209701,2.399481 -0.030409,0.859249 0.1871479,2.012596 0.4831239,2.563038 1.1183395,2.078973 4.4015875,3.043417 6.4773485,1.902679 1.084371,-0.595907 2.192771,-0.641965 2.014697,-0.08355 -0.228681,0.716725 -3.134296,1.925895 -4.6141,1.920084 -0.807877,-0.0024 -1.996897,-0.326828 -2.793056,-0.760311 z m 0.743623,-2.525684 c -0.775217,-0.823475 -0.72696,-1.922061 0.120152,-2.736463 0.924417,-0.88867 2.264244,-0.854725 2.94129,0.07441 0.729878,1.001749 0.68256,1.799982 -0.154514,2.604571 -0.869435,0.835838 -2.150424,0.861102 -2.907051,0.05735 z m 6.069134,-0.781497 c -0.65581,-0.430588 -1.256735,-0.971216 -1.335375,-1.201453 -0.199264,-0.58335 1.318045,-0.517044 2.158901,0.09443 0.953886,0.693559 3.297831,0.610071 4.619357,-0.164651 1.579457,-0.925803 2.307686,-2.443605 2.111966,-4.401816 -0.08788,-0.879041 -0.02397,-1.795953 0.141997,-2.037596 0.535174,-0.779128 1.333602,0.706831 1.333602,2.481979 0,3.541924 -2.061995,5.670071 -5.702634,5.885502 -1.798003,0.106544 -2.323848,0.0024 -3.327845,-0.656452 z M 3.8190657,43.969759 C 2.475605,42.585055 2.0761172,41.63306 2.0904808,39.850642 c 0.014826,-1.908998 0.6680713,-3.259457 2.157715,-4.464446 1.2593305,-1.018675 2.2130438,-1.303772 3.8565098,-1.152841 1.6474714,0.1513 1.3592583,0.69096 -0.6277988,1.175493 -4.2392854,1.033764 -5.3140638,5.251106 -2.1108663,8.28291 0.335309,0.31736 0.6096277,0.716946 0.6096277,0.887975 0,0.643274 -1.2964633,0.276593 -2.1566025,-0.609974 z m 15.5881693,0.176764 c -0.729877,-1.001749 -0.682534,-1.799999 0.154513,-2.604601 1.371957,-1.318906 3.483586,-0.454676 3.483586,1.425725 0,1.8446 -2.550739,2.671117 -3.638026,1.178876 z M 5.2789438,40.872147 C 4.4419694,40.067547 4.394651,39.269311 5.1244294,38.267562 6.1811109,36.817264 8.762443,37.674166 8.762443,39.475246 c 0,0.911374 -1.1684266,2.066676 -2.0901738,2.066676 -0.3831712,0 -1.0102284,-0.301393 -1.3934243,-0.669775 z M 21.30346,39.521555 c 0,-0.199706 0.509477,-0.972576 1.132165,-1.717469 0.960193,-1.148612 1.132166,-1.626087 1.132166,-3.143192 0,-1.578656 -0.138326,-1.926055 -1.177322,-2.956567 -0.792626,-0.786153 -1.731716,-1.295579 -2.87396,-1.558988 -2.659059,-0.61324 -2.114676,-1.565893 0.665745,-1.165064 1.212647,0.174812 1.936492,0.540885 2.898828,1.466007 2.186523,2.101966 2.573872,4.868788 1.023648,7.311904 -0.702692,1.10741 -2.80127,2.428455 -2.80127,1.763369 z M 18.864949,35.513943 C 17.945553,34.6301 17.986022,33.984219 19.02342,32.98707 c 1.016534,-0.977203 1.958481,-1.049018 2.748721,-0.209573 1.833154,1.947277 -0.976673,4.592187 -2.907067,2.736454 z m -8.8843872,-2.46644 c -1.3031636,-1.911979 1.4864302,-3.974741 3.0824792,-2.279329 0.756355,0.803433 0.731706,1.827843 -0.06057,2.517109 -0.937837,0.81589 -2.381177,0.702336 -3.0219298,-0.23778 z M 5.9094124,32.659525 c -0.4430487,-0.425921 0.2638862,-2.005418 1.419902,-3.172467 2.3225881,-2.344752 5.6467286,-2.468306 8.2095196,-0.305141 1.17834,0.994568 2.232079,3.147519 1.757905,3.591653 -0.13425,0.125786 -0.502631,-0.124867 -0.818509,-0.557012 -1.776421,-2.430268 -2.682789,-3.130847 -4.273425,-3.303218 -2.063549,-0.223586 -3.4393213,0.463427 -4.8360089,2.414948 -1.1303294,1.579338 -1.1667454,1.612555 -1.4593837,1.331237 z"
                 style="fill:#162d50;fill-opacity:1;stroke-width:0.116339" />
              <rect
                 style="fill:#162d50;fill-opacity:1;stroke:none;stroke-width:0.170435;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 id="rect2113"
                 width="4.3417726"
                 height="3.9183271"
                 x="12.082276"
                 y="36.904747"
                 ry="0" />
              <text
                 xml:space="preserve"
                 style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:17.0px;line-height:1.25;font-family:'Mark Pro';-inkscape-font-specification:'Mark Pro';fill:#162d50;fill-opacity:1;stroke-width:0.195586"
                 x="27.87245"
                 y="42.605282"
                 id="text2117"><tspan
                   sodipodi:role="line"
                   id="tspan2115"
                   style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-family:Itim;-inkscape-font-specification:Itim;fill:#1a1a1a;fill-opacity:1;stroke-width:0.195586"
                   x="27.87245"
                   y="42.605282">BIG VENTAS</tspan></text>
              <text
                 xml:space="preserve"
                 style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:8.66479px;line-height:1.25;font-family:Itim;-inkscape-font-specification:Itim;fill:#005521;fill-opacity:0.992157;stroke-width:0.0970058"
                 x="33.019695"
                 y="49.250538"
                 id="text2121"><tspan
                   sodipodi:role="line"
                   id="tspan2119"
                   style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:8.66479px;font-family:Itim;-inkscape-font-specification:Itim;fill:#005521;fill-opacity:0.992157;stroke-width:0.0970058"
                   x="33.019695"
                   y="49.250538">by Conference Comercial</tspan></text>
              <text
                 xml:space="preserve"
                 style="font-size:3.52777px;line-height:1.25;font-family:'Mark Pro';-inkscape-font-specification:'Mark Pro';stroke-width:0.264584"
                 x="-118.67944"
                 y="148.49055"
                 id="text2127"><tspan
                   sodipodi:role="line"
                   id="tspan2123"
                   style="font-size:3.52777px;fill:#162d50;fill-opacity:1;stroke-width:0.264584"
                   x="-118.67944"
                   y="148.49055" /><tspan
                   sodipodi:role="line"
                   style="font-size:3.52777px;fill:#162d50;fill-opacity:1;stroke-width:0.264584"
                   x="-118.67944"
                   y="152.90027"
                   id="tspan2125" /></text>
              <path
                 style="fill:#162d50;fill-opacity:1;stroke-width:0.391546;paint-order:stroke fill markers"
                 d="M 12.211604,38.993047 V 37.23109 h 1.957712 1.957734 v 1.761957 1.761955 h -1.957734 -1.957712 z"
                 id="path2129" />
              <text
                 xml:space="preserve"
                 style="font-size:4.58609px;line-height:1.25;font-family:Unbounded;-inkscape-font-specification:Unbounded;stroke-width:0.264584"
                 x="-32.726368"
                 y="126.88573"
                 id="text2141"><tspan
                   sodipodi:role="line"
                   id="tspan2139"
                   style="stroke-width:0.264584"
                   x="-32.726368"
                   y="126.88573" /></text>
              <text
                 xml:space="preserve"
                 style="font-style:normal;font-weight:normal;font-size:10.5833px;line-height:1.25;font-family:sans-serif;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.264584"
                 x="-120.69562"
                 y="101.85343"
                 id="text2145"><tspan
                   sodipodi:role="line"
                   id="tspan2143"
                   style="stroke-width:0.264584"
                   x="-120.69562"
                   y="101.85343" /></text>
            </g>
            <text
               xml:space="preserve"
               style="font-weight:800;font-size:10.5833px;line-height:1.25;font-family:Montserrat;-inkscape-font-specification:'Montserrat Ultra-Bold';stroke-width:0.264583"
               x="63.001961"
               y="76.765839"
               id="text168966"><tspan
                 sodipodi:role="line"
                 id="tspan168964"
                 style="stroke-width:0.264583"
                 x="63.001961"
                 y="76.765839">Nivel Premium</tspan></text>
            <text
               xml:space="preserve"
               style="font-style:normal;font-weight:normal;font-size:14.0px;line-height:1.25;font-family:sans-serif;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.264583"
               x="48.746986"
               y="108.77528"
               id="text18857"><tspan
                 sodipodi:role="line"
                 id="tspan18855"
                 style="stroke-width:0.264583"
                 x="48.746986"
                 y="108.77528">${this.state.clientName}</tspan></text>
          </g>
        </svg>`
        let couponBlob = new Blob([couponSvg], { type: 'image/svg+xml' });
        let url = URL.createObjectURL(couponBlob)
        let coupon = new Image();
        coupon.src = url;
        let code = this.state.code;
        coupon.onload =()=>{
            let canvas = document.createElement('canvas');
            let redirectTo = this.state.redirectTo;
            canvas.width = coupon.width;
            canvas.height = coupon.height;
            var ctx = canvas.getContext('2d');
            ctx.drawImage(coupon, 0, 0);
            canvas.toBlob(function(blob){
                var url = URL.createObjectURL(blob);
                var a = document.createElement('a');
                a.href = url;
                a.download = `coupon.png`;
                document.body.appendChild(a);
                a.click();
                window.location.href = `${redirectTo}?code=${code}`;
                //location.reload();
            })
            
        }
    }

    handleEvent(event) {
        if (event.type === "click") {   
            if (event.target.id==='closeCoupon'){
                const clickFunnel = new CustomEvent('user:cancelCupon',{
                    detail:{click:event.target.id},
                    bubbles: true,
                    composed: true
                });
                this.dispatchEvent(clickFunnel);
                
            } else if (event.target.id==='btnCoupon'){
                let clientName = this.querySelector('input').value;
                if (clientName.length>10){
                    this.state.clientName = clientName;
                    const clickFunnel = new CustomEvent('user:getCupon',{
                        detail:{click:event.target.id},
                        bubbles: true,
                        composed: true
                    });                   
                    this.dispatchEvent(clickFunnel);
                    this.renderCoupon();
                    const coupon = new CustomEvent('funnel:createCupon',{
                        detail:{coupon:this.state.code},
                        bubbles: true,
                        composed: true
                    });
                    this.dispatchEvent(coupon);
                } else {
                    this.querySelector('.help').classList.remove('is-hidden');
                }
            }
        }
    }

    render(){
        this.innerHTML =  /* html */`
            <div class="modal-background"></div>
                <div class="modal-card">
                    <header class="modal-card-head">
                        <p class="modal-card-title">${ this.state.form.title.text[[this.state.context.lang]]}</p>
                        <button id="closeCoupon" class="delete" aria-label="close"></button>
                    </header>
                <section class="modal-card-body">
                    <div class="field">
                        <label class="label">${ this.state.form.fieldName.text[[this.state.context.lang]]}</label>
                    <div class="control">
                        <input class="input" type="text" placeholder="${ this.state.form.placeholder.text[[this.state.context.lang]]}">
                        <p class="help is-danger is-hidden">${ this.state.form.error.text[[this.state.context.lang]]}</p>
                    </div>
                    <div class="control pt-4">
                        <button id="btnCoupon" class="button btn-coupon is-primary">${ this.state.form.button.text[[this.state.context.lang]]}</button>
                    </div>
                </section>
            </div>
            </div>   
        `
        let btnClose = this.querySelector(".delete");
        btnClose.addEventListener("click",this);
        let btnCoupon = this.querySelector(".btn-coupon");
        btnCoupon.addEventListener("click",this);

    }
}


customElements.define("discount-coupon", DiscountCoupon);