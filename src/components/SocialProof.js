import { AppElement } from "@buyerjourney/bj-core";
import { icon } from "@fortawesome/fontawesome-svg-core";
import { faCartPlus, faTruck} from '@fortawesome/free-solid-svg-icons';
import { toast } from "bulma-toast";

export class SocialProof extends AppElement {

    #default = {
        position:"top-right",
        type:'',
        dismissible:false,
        duration:3000,
        animateIn:"backInUp",
        animateOut:"backOutRight" ,
        visitors:{
            type:'',
            color:"has-text-white",
            background:"has-background-info-dark",
            text:{
                es:"visitantes están comprando en línea.",
                en:"visitors are buying online.",
                fr:"visiteurs font des achats en ligne."
                }
        },
        purchase:{
            color:"has-text-white",
            background:"has-background-warning-dark",
            text:{
                es:"En",
                en:"At",
                fr:"Chez"
                },
            text2:{
                es:"compraron:",
                en:"they bought:",
                fr:", ils ont acheté:"
                }
            
        },
        event:{
            color:"has-text-white",
            background:"has-background-primary-dark"
        },
        webinar:{
            color:"has-text-white",
            background:"has-background-danger-dark"
        },
        course:{
            color:"has-text-white",
            background:"has-background-link-dark"
        },
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
            fr:"il y a {} jours."},
        items : [],
        context:{
            lang:"en"
        }
        };

    constructor(props={}){
        super();
        this.state =this.initState(this.#default,props);
        this.setStyles();
    }



    #getProof(src){
        fetch(src)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error when making the request');
                  }
                  return response.json();
            })
            .then(data => {
                this.state.items = [];
                data.forEach(proof => {                    
                    let indicator = '';
                    let content = '';
                    let type = '';
                    let color = '';
                    let background = ''
                    let when = this.#getDT(proof.delta);
                    if (proof.type==='visitors'){
                        indicator = icon(faCartPlus, {classes: [this.state.visitors.color]}).html[0];
                        content = `<p><b>${proof.count} </b>${this.state.visitors.text[this.state.context.lang]}<p>                                    
                                    <h3>${this.#getDT(proof.delta)}</h3>`
                        type = this.state.visitors.type;
                        color = this.state.visitors.color;
                        background = this.state.visitors.background;
                    }else if (proof.type==='purchase'){
                        indicator = icon(faTruck, {classes: [this.state.purchase.color]}).html[0];
                        content = `
                            <h1>${this.state.purchase.text[this.state.context.lang]} <b>${proof.place}</b> ${this.state.purchase.text2[this.state.context.lang]}</h1>
                            <h2>${proof.count} <b>${proof.name}.</b></h2>
                            <h3>${when}</h3>
                        `
                        type = this.state.purchase.type;
                        color = this.state.purchase.color;
                        background = this.state.purchase.background;
                    }else if (proof.type==='webinar'){
                        indicator = `<p>${proof.count}<p>`;
                        content = `<p>People ${proof.name}<p>
                            <h3>${this.#getDT(proof.delta)}</h3>`
                        type = this.state.webinar.type;
                        color = this.state.webinar.color;
                        background = this.state.webinar.background;
                    }else if (proof.type==='course'){
                        indicator = `<p>${proof.count}<p>`;
                        content = `<p>People registered for this course.<p>
                            <h3>${this.#getDT(proof.delta)}</h3>`
                        type = this.state.course.type;
                        color = this.state.course.color;
                        background = this.state.course.background;
                    }else if (proof.type==='event'){
                        indicator = `<p>${proof.count}<p>`;
                        content = `<p>People registered for this sevent.<p>
                            <h3>${this.#getDT(proof.delta)}</h3>`
                        type = this.state.event.type;
                        color = this.state.event.color;
                        background = this.state.event.background;
                    }
                    let message = /*html*/`
                    <div class="social-proof">
                        <div class="social-proof-indicator ${color} ${background}">
                            ${indicator}
                        </div>
                        <div class="social-proof-content has-text-dark has-background-light">
                            ${content}
                        </div>
                    </div>
                    `
                    this.state.items.push(message);                   
                });
              })
              .catch(error => {
                console.error('There was a problem with the request', error);
              });
    }



    loadProofs(){
        let src = this.getAttribute("src");
        if (src!=null){
            this.#getProof(src)
        }else console.error(`The src attribute has not been set on the social-proof element with id "${this.id}"`)
        
    }

    showToast(){
        if (this.state.items.length>0){
            let message = this.state.items.shift();
            toast({
                duration:3000,
                type:this.state.type,
                position:this.state.position,
                dismissible:this.state.dismissible,
                message: message,
                extraClasses: 'social-proof-wrapper',
                animate: { in: this.state.animateIn, out: this.state.animateOut },
                });
        }
    }

    #getDT(delta){
        let message = '';
        if (delta < 60){
            if (delta == 1){
                message = this.state.m[this.state.context.lang]
            }else{
                message = this.state.ms[this.state.context.lang].replace("{}", delta);
            }
        }else if (delta < 1440){
            if (delta == 60){
                message = this.state.h[this.state.context.lang]
            }else{
                message = this.state.hs[this.state.context.lang].replace("{}", delta);
            }
        }else{
            if (delta == 1440){
                message = this.state.d[this.state.context.lang]
            }else{
                message = this.state.ds[this.state.context.lang].replace("{}", delta);
            }
        }
        return message;
    }

   
    socialProofStyles = /* css */ `
    .social-proof-wrapper {padding: 0.25rem !important;box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;}
    .social-proof { display:flex; width: 250px;}
    .social-proof-indicator { display: inline-flex; flex-direction: column; align-items: flex-start; width: 50px; height: 50px;  display: inline-flex; flex-direction: column; align-items: flex-start}
    .social-proof-indicator img { width: 48px; height: 48px; }
    .social-proof-indicator svg { margin: auto auto; display: block;}
    .social-proof-indicator p { font-size: 20; font-weight: bold; margin: auto; padding-top: 15px; }
    .social-proof-content { flex-grow: 1; display: inline-flex; flex-direction: column; align-items: flex-start; height: 50px; padding-left: 5px; width:200px;}
    .social-proof-content h1 {font-size: 12px;}
    .social-proof-content h2 {font-size: 10px;}
    .social-proof-content h3 {font-size: 9px; text-align:right;}
    .social-proof-content p { padding-left: 5px; padding-top: 5px; font-size: 14px;}
        `;

    setStyles(){
        var socialProofStyles = document.createElement('style');
        socialProofStyles.innerText = this.socialProofStyles;
        document.head.appendChild(socialProofStyles)
    }
     

    render(){
        this.loadProofs();
    }
   

}

customElements.define("social-proof", SocialProof)