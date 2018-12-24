const context = {tmtAuth: {}, authenticated: true}

export const TMTAuthContext = ({
  Consumer(props) {
    return props.children(context)
  }
})
