import React from 'react'
import buttonStyles from "../button/button.module.css"

function Button({children,type}) {
  return (
    <div>
      <button className={buttonStyles.btn} type={type}>
{children}
      </button>
    </div>
  )
}

export default Button