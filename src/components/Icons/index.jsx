import CloseIcon from "./Close";

const Icon = ({name}) => {
  switch (name) {
    case 'close':
      return <CloseIcon />

    default:
  }

  return null;
}

export default Icon;