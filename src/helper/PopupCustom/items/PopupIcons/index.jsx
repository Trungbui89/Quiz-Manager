import React from 'react'

export default function Icons(props) {
    const {
        type
    } = props
    const [link, setLink] = React.useState('/')
    // console.log(link)
    
    const choice = () => {
        switch(type) {
            case 'success': 
                setLink('/icon/Ellipse_6.png')
                break
            case 'warning':
                setLink('/icon/Vector_warning.png')
                break
            default:
                setLink('/')
        }
    }
    React.useEffect(() => {
        choice()
    },[type])
    return (
        <div>
            <img
                src={link}
                style={{ height: '95px', width: '95px', margin: '20px' }}
                alt=''
            />
        </div>
    )
}