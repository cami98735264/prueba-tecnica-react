import useColors from "../../hooks/useColors";


const Separator = (props: { color: "primary" | "secondary"}) => {
    const { color } = useColors();
    const style = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "2px",
        backgroundColor: props.color === "primary" ? color.primary : color.secondary,
        margin: "0",
    }
    return (
        <div style={style} />
    );
    }

export default Separator;