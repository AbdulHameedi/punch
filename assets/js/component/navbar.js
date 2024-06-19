class Navbar extends HTMLElement{
    connectedCallback(){
        this.innerHTML = `
            <h1>Hello World</h1>
        `
    }
}
customElements.define('app-navbar', Navbar)