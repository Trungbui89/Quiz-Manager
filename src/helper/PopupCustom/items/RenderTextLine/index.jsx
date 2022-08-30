import React from 'react'

export default function RenderTextLine(props) {
    const {
        paragraph
    } = props
    const RenderText = paragraph.map((item, index) => {
        return(<p style={styles.paragraph} key={index}>{item}</p>)
    })

    return (
        <>
            {RenderText}
        </>
    )
}

const styles = {
    paragraph: {
        marginBottom: '5px',
        marginLeft: '45px',
        marginRight: '45px'
    }
}