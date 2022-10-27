import * as Material from 'react-icons/md';
import * as BoxIcons from 'react-icons/bi';

function UPIcons({ ...props }) {
  const { className, iconClassName, style, iconStyle, name, color, size } = props;

  function getIcon() {
    if (name === 'MdPerson') {
      return (
        <Material.MdPerson className={iconClassName} style={iconStyle} color={color} size={size} />
      );
    } else if (name === 'MdDone') {
      return (
        <Material.MdDone className={iconClassName} style={iconStyle} color={color} size={size} />
      );
    } else if (name === 'MdPriorityHigh') {
      return (
        <Material.MdPriorityHigh
          className={iconClassName}
          style={iconStyle}
          color={color}
          size={size}
        />
      );
    } else if (name === 'MdSort') {
      return (
        <Material.MdSort className={iconClassName} style={iconStyle} color={color} size={size} />
      );
    } else if (name === 'BiFilterAlt') {
      return (
        <BoxIcons.BiFilterAlt
          className={iconClassName}
          style={iconStyle}
          color={color}
          size={size}
        />
      );
    } else if (name === 'BiSortDown') {
      return (
        <BoxIcons.BiSortDown
          className={iconClassName}
          style={iconStyle}
          color={color}
          size={size}
        />
      );
    } else if (name === 'BiSortUp') {
      return (
        <BoxIcons.BiSortUp className={iconClassName} style={iconStyle} color={color} size={size} />
      );
    } else if (name === 'BiCopy') {
      return (
        <BoxIcons.BiCopy className={iconClassName} style={iconStyle} color={color} size={size} />
      );
    } else if (name === 'BiExit') {
      return (
        <BoxIcons.BiExit className={iconClassName} style={iconStyle} color={color} size={size} />
      );
    } else if (name === 'BiHistory') {
      return (
        <BoxIcons.BiHistory className={iconClassName} style={iconStyle} color={color} size={size} />
      );
    } else if (name === 'BiExport') {
      return (
        <BoxIcons.BiExport className={iconClassName} style={iconStyle} color={color} size={size} />
      );
    } else if (name === 'BiCoin') {
      return (
        <BoxIcons.BiCoin className={iconClassName} style={iconStyle} color={color} size={size} />
      );
    } else if (name === 'BiTimeFive') {
      return (
        <BoxIcons.BiTimeFive
          className={iconClassName}
          style={iconStyle}
          color={color}
          size={size}
        />
      );
    }
  }

  return (
    <span className={'d-flex align-items-center justify-content-center ' + className} style={style}>
      {getIcon()}
    </span>
  );
}

export default UPIcons;
