import logo from '../assets/Logo.svg'

const Footer = () => {
    return (
        <footer>
            <div>
                <img src={logo} alt="logo"/>
            </div>
            <div className='tel'>
                <p>+380669384758</p>
                <p>+380669384758</p>
            </div>
            <div>
                <p>shaker.cocktails@gmail.com</p>
            </div>
            <div className='social'>
                <a href="#" className='fb'></a>
                <a href="#" className='ig'></a>
                <a href="#" className='yt'></a>
            </div>
        </footer>
    )
}

export default Footer