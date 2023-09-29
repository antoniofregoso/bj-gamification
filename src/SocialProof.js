import { FunnelElement } from "./FunnelElement";
import { toast } from "bulma-toast";

export class SocialProof extends FunnelElement {

    #default = {
        visitorColor:"hsl(48, 100%, 67%)",
        visitorBackground:"purple",
        webinarColor:"hsl(48, 100%, 67%)",
        webinarBackground:"violet",
        animateIn:"backInUp",
        animateOut:"backOutRight" ,
        visitors:{
            es:"visitantes están comprando en línea.",
            en:"visitors are buying online.",
            fr:"visiteurs font des achats en ligne."
        },
        purchase:{},
        webinar:{},
        registered:{},
        signup:{},
        m:{
            es:"Hace un minuto.",
            en:"A minute ago.",
            fr:"Il y'a une minute."
        },
        ms:{
            es:"Hace {} minutos.",
            en:"{} minutes ago.",
            fr:"Cela fait {} minutes."},
        h:{
            es:"Hace una hora.",
            en:"An hour ago.",
            fr:"Il y a une heure."},
        hs:{
            es:"Hace {} horas.",
            en:"{} hours ago.",
            fr:"il y a {} heures."},
        d:{
            es:"Hace un día.",
            en:"A day ago.",
            fr:"Il y a un jour."},
        ds:{
            es:"Hace {} días.",
            en:"{} days ago.",
            fr:"il y a {} jours."}
        };

    constructor(props={}){
        super();
        this.state =this.initState(this.#default,props);
        this.setStyles();
        this.getProofs();
        
    }

    getProofs(){
        let dT = Math.floor(Math.random() * 57000) + 3000;
        this.state.proofs.forEach(proof => {
            setTimeout(() => {
                let indicator = ``;
                let content = ``;
                let color = ``;
                let tag = ``;
                let tag2 = ``;
                if (proof.type==='visitors'){
                    indicator = this.cart
                    content = `<h4><b>${proof.count} </b>visitors are buying online.<h4>`
                    tag = `white`
                    tag2 = `purple`
                    color = `style="fill:${tag}; background-color:${tag2};"`
                }else if (proof.type==='purchase'){
                    let when = this.getDT(proof.date);
                    indicator = `<img src="${proof.imageUrl}" alt="${proof.product}">`;
                    content = `
                        <h1><b>${proof.name}</b> (${proof.city}).</h1>
                        <h2>Purchased <b>${proof.product}.</b></h2>
                        <h3>12 minutes ago.</h3>
                    `
                    color = ``
                }else if (proof.type==='webinar'){
                    indicator = `<p>${proof.count}<p>`;
                    content = `<p>People registered for this webinar.<p>`
                    tag = `blue`;
                    tag2 = `green`;
                    color = `style="color:${tag}; background-color:${tag2};"`
                }else if (proof.type==='registered'){
                    let when = this.getDT(proof.date);
                    indicator = `<img src="${proof.imageUrl}" alt="${proof.product}">`;
                    content = `
                        <h1><b>${proof.name}</b> (${proof.city}).</h1>
                        <h2>Registered for this webinar</h2>
                        <h3>12 minutes ago.</h3>
                    `
                    color = ``

                }else {
                    let when = this.getDT(proof.date);
                    indicator = `<img src="${proof.imageUrl}" alt="${proof.product}">`;
                    content = `
                    <h1><b>${proof.name}</b> (${proof.city}).</h1>
                    <h2>Signed up for <b>${proof.product}.</b></h2>
                    <h3>12 minutes ago.</h3>
                `
                }
                let message = /*html*/`
                    <div class="social-proof">
                    <div class="social-proof-indicator" ${color}>
                        ${indicator}
                    </div>
                    <div class="social-proof-content">
                        ${content}
                    </div>
                </div>
                `
                toast({
                    "duration": 3000,
                    message: message,
                    type: null,
                    extraClasses: 'social-proof-wrapper',
                    animate: { in: this.attachInternals.animateIn, out: this.state.animateOut },
                    })

            }, dT);
            dT += Math.floor(Math.random() * 30000);
        })        
    }

    getDT(date){
        let i = 0;
        let when =  new Date(date);
        let delta = (Date.now() - when)/60000;
        let res = ''
        if (delta < 60){
            i = parseInt(delta);
            console.log('Minutos', i)
        }else if (delta < 1440){
            i = parseInt(delta/60);
            console.log('Horas', i)
        }else{
            i = parseInt(delta/1440)
            console.log('Dias', i)   
        }
        return 5
    }

   
    socialProofStyles = /* css */ `
    .social-proof-wrapper {padding: 0.25rem !important;box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;}
    .social-proof { display:flex; width: 250px; background-color: white;  color:#1f1f24; }
    .social-proof-indicator { display: inline-flex; flex-direction: column; align-items: flex-start; width: 50px; height: 50px;  display: inline-flex; flex-direction: column; align-items: flex-start}
    .social-proof-indicator img { width: 48px; height: 48px; }
    .social-proof-indicator svg { margin: auto auto; display: block;}
    .social-proof-indicator p { font-size: 20; font-weight: bold; margin: auto; padding-top: 15px; }
    .social-proof-content { flex-grow: 1; display: inline-flex; flex-direction: column; align-items: flex-start; height: 50px; color: hsl(0, 0%, 21%); padding-left: 5px;}
    .social-proof-content h1 {font-size: 12px;}
    .social-proof-content h2 {font-size: 10px;}
    .social-proof-content h3 {font-size: 9px;}
    .social-proof-content h4 {font-size: 14px; text-align: left; padding-top: 16px;}
    .social-proof-content p { padding-left: 5px; padding-top: 5px; font-size: 14px; text-align: left;}
        `;

    setStyles(){
        var socialProofStyles = document.createElement('style');
        socialProofStyles.innerText = this.socialProofStyles;
        document.head.appendChild(socialProofStyles)
    }
    
    cart = `<svg xmlns="http://www.w3.org/2000/svg" height="2em" viewBox="0 0 576 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96zM252 160c0 11 9 20 20 20h44v44c0 11 9 20 20 20s20-9 20-20V180h44c11 0 20-9 20-20s-9-20-20-20H356V96c0-11-9-20-20-20s-20 9-20 20v44H272c-11 0-20 9-20 20z"/></svg>`;

    

    registeredCount = `<p>22,235<p>`;

    registered =  /* html */ `
    <p>People registered for this webinar.<p>
    `;

   
   

}

customElements.define("social-proof", SocialProof)