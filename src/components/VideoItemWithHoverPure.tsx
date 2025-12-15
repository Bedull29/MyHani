import { PureComponent, ForwardedRef, forwardRef } from "react";

type VideoItemWithHoverPureType = {
  src: string;
  innerRef: ForwardedRef<HTMLDivElement>;
  handleHover: (value: boolean) => void;
  rank?: number;
};

class VideoItemWithHoverPure extends PureComponent<VideoItemWithHoverPureType> {
  render() {
    return (
      <div
        ref={this.props.innerRef}
        style={{
          zIndex: 9,
          cursor: "pointer",
          borderRadius: 0.5,
          width: "100%",
          position: "relative",
          paddingTop: "calc(9 / 16 * 100%)",
        }}
      >
        <img
          src={this.props.src}
          style={{
            top: 0,
            height: "100%",
            objectFit: "cover",
            position: "absolute",
            borderRadius: "4px",
          }}
          onPointerEnter={() => {
            // console.log("onPointerEnter");
            this.props.handleHover(true);
          }}
          onPointerLeave={() => {
            // console.log("onPointerLeave");
            this.props.handleHover(false);
          }}
        />
        {this.props.rank !== undefined && (
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 150 150"
            style={{
              position: "absolute",
              left: "-10px",
              bottom: "0px",
              height: "100%",
              pointerEvents: "none",
            }}
          >
            <text
              x="0"
              y="150"
              fill="black"
              stroke="#595959"
              strokeWidth="4"
              fontSize="160"
              fontWeight="bold"
              style={{
                fontFamily: "Arial, sans-serif",
                textShadow: "2px 2px 4px hsla(0, 0%, 99%, 1.00)",
              }}
            >
              {this.props.rank}
            </text>
            <text
              x="0"
              y="150"
              fill="hsla(0, 0%, 100%, 1.00)"
              fontSize="160"
              fontWeight="bold"
              style={{ fontFamily: "Arial, sans-serif" }}
            >
              {this.props.rank}
            </text>
          </svg>
        )}
      </div>
    );
  }
}

const VideoItemWithHoverRef = forwardRef<
  HTMLDivElement,
  Omit<VideoItemWithHoverPureType, "innerRef">
>((props, ref) => <VideoItemWithHoverPure {...props} innerRef={ref} />);
VideoItemWithHoverRef.displayName = "VideoItemWithHoverRef";

export default VideoItemWithHoverRef;
