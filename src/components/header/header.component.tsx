import './header.component.css'

function HeaderComponent() {
    return (
        <header>
            <a className="logo" href="/">Logotype</a>
            <button onClick={() => console.log('Do nothing')}>Connect wallet</button>
        </header>
    )
}

export default HeaderComponent;
