import '../../css/GlitchText.css';
// Đây là một component React để tạo hiệu ứng chữ "glitch" lấy từ ReactBit
const GlitchText = ({ children, speed = 1, enableShadows = true, enableOnHover = true, className = '' }) => {
    const inlineStyles = {
        '--after-duration': `${speed * 3}s`,
        '--before-duration': `${speed * 2}s`,
        '--after-shadow': enableShadows ? '-5px 0 red' : 'none',
        '--before-shadow': enableShadows ? '5px 0 cyan' : 'none'
    };

    const hoverClass = enableOnHover ? 'enable-on-hover' : '';

    return (
        <div className={`glitch ${hoverClass} ${className}`} style={inlineStyles} data-text={children}>
            {children}
        </div>
    );
};

export default GlitchText;
