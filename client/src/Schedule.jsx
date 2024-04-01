import { Link } from "react-router-dom";

export function Schedule(props) {
    const { 
        schedules,
        intToColor,
        className,
        wrapper,
    } = props;
    const today = new Date().getDay();

    function isScheduleToday(schedule) {
        return (today === 1 && schedule.monday) || (today === 2 && schedule.tuesday) || (today === 3 && schedule.wednesday)
         || (today === 4 && schedule.thursday) || (today === 5 && schedule.friday) || (today === 6 && schedule.saturday)
          || (today === 0 && schedule.sunday);
    }
    return (
    <>
    {wrapper ? (
      schedules && (
        <div className={className}>
          {schedules.map(schedule => (
            isScheduleToday(schedule) && (
              <Link
                style={{ backgroundColor: `${intToColor(schedule.reptileId)}` }}
                className="schedule"
                key={schedule.id}
                to={`/schedule/${schedule.id}`}
              >
                <div className="name">{schedule.type}</div>
                <div className="species">{schedule.description}</div>
                <Schedule />
                <div className="days-of-week">
                  {schedule.monday && (
                    <div className="day" style={today === 1 ? { fontWeight: "bold" } : {}}>
                      Mon
                    </div>
                  )}
                  {schedule.tuesday && (
                    <div className="day" style={today === 2 ? { fontWeight: "bold" } : {}}>
                      Tue
                    </div>
                  )}
                  {schedule.wednesday && (
                    <div className="day" style={today === 3 ? { fontWeight: "bold" } : {}}>
                      Wed
                    </div>
                  )}
                  {schedule.thursday && (
                    <div className="day" style={today === 4 ? { fontWeight: "bold" } : {}}>
                      Thu
                    </div>
                  )}
                  {schedule.friday && (
                    <div className="day" style={today === 5 ? { fontWeight: "bold" } : {}}>
                      Fri
                    </div>
                  )}
                  {schedule.saturday && (
                    <div className="day" style={today === 6 ? { fontWeight: "bold" } : {}}>
                      Sat
                    </div>
                  )}
                  {schedule.sunday && (
                    <div className="day" style={today === 0 ? { fontWeight: "bold" } : {}}>
                      Sun
                    </div>
                  )}
                </div>
              </Link>
            )
          ))}
        </div>
      )
    ) : (
      schedules &&
      schedules.map(schedule => (
        (
          <Link
            style={{ backgroundColor: `${intToColor(schedule.reptileId)}` }}
            className="schedule"
            key={schedule.id}
            to={`/schedule/${schedule.id}`}
          >
            <div className="name">{schedule.type}</div>
            <div className="species">{schedule.description}</div>
            <Schedule />
            <div className="days-of-week">
              {schedule.monday && (
                <div className="day" style={today === 1 ? { fontWeight: "bold" } : {}}>
                  Mon
                </div>
              )}
              {schedule.tuesday && (
                <div className="day" style={today === 2 ? { fontWeight: "bold" } : {}}>
                  Tue
                </div>
              )}
              {schedule.wednesday && (
                <div className="day" style={today === 3 ? { fontWeight: "bold" } : {}}>
                  Wed
                </div>
              )}
              {schedule.thursday && (
                <div className="day" style={today === 4 ? { fontWeight: "bold" } : {}}>
                  Thu
                </div>
              )}
              {schedule.friday && (
                <div className="day" style={today === 5 ? { fontWeight: "bold" } : {}}>
                  Fri
                </div>
              )}
              {schedule.saturday && (
                <div className="day" style={today === 6 ? { fontWeight: "bold" } : {}}>
                  Sat
                </div>
              )}
              {schedule.sunday && (
                <div className="day" style={today === 0 ? { fontWeight: "bold" } : {}}>
                  Sun
                </div>
              )}
            </div>
          </Link>
        )
      ))
    )}
  </>
    )
}