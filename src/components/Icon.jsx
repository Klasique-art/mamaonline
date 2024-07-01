import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Icon = ({name, ...otherProps}) => {
  return (
    <FontAwesomeIcon icon={name} {...otherProps} />
  )
}

export default Icon