import React from "react";

function ProgressBar({
  session,
  focusDuration,
  secondsToDuration,
  breakMinuteDisplay,
  focusMinuteDisplay,
  breakDuration,
}) {
  return (
    session !== null && (
      <>
        <div>
          {/* TODO: This area should show only when there is an active focus or break - i.e. the session is running or is paused */}
          <div className="row mb-2">
            {session !== null ? (
              <div className="col">
                {/* TODO: Update message below to include current session (Focusing or On Break) total duration */}
                {session?.label === "On Break" && (
                  <h2 data-testid="session-title">
                    {session?.label} for {breakMinuteDisplay}
                  </h2>
                )}
                {session?.label === "Focusing" && (
                  <h2 data-testid="session-title">
                    {session?.label} for {focusMinuteDisplay}
                  </h2>
                )}
                <p className="lead" data-testid="session-sub-title">
                  {secondsToDuration(session?.timeRemaining)} remaining
                </p>
              </div>
            ) : null}
          </div>
          <div className="row mb-2">
            <div className="col">
              <div className="progress" style={{ height: "20px" }}>
                <div
                  id="dynamic"
                  className="progress-bar"
                  role="progressbar"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  aria-valuenow={
                    session?.label === "Focusing"
                      ? ((focusDuration * 60 - session?.timeRemaining) /
                          (focusDuration * 60)) *
                        100
                      : ((breakDuration * 60 - session?.timeRemaining) /
                          (breakDuration * 60)) *
                        100
                  } // TODO: Increase aria-valuenow as elapsed time increases
                  style={{
                    width:
                      session?.label === "Focusing"
                        ? ((focusDuration * 60 - session?.timeRemaining) /
                            (focusDuration * 60)) *
                            100 +
                          "%"
                        : ((breakDuration * 60 - session?.timeRemaining) /
                            (breakDuration * 60)) *
                            100 +
                          "%",
                  }}
                />
                <span id="current-progress"></span>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  );
}

export default ProgressBar;
