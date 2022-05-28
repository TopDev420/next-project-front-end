import { useSelector } from 'react-redux';
import { myPagePropertyIdSelector } from 'lib/store/selectors/my-page/property';
import { useCallback, useState, useRef, useMemo, useEffect } from 'react';
import { reservationKeyApi } from 'lib/apis/reservation-key';
import Alert, { AlertProps } from 'components/Alert';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

enum JobStatus {
  STATUS_QUEUED = 'queued',
  STATUS_EXECUTING = 'executing',
  STATUS_FINISHED = 'finished',
  STATUS_FAILED = 'failed',
  STATUS_RETRYING = 'retrying',
}

const UpdateCalendar = () => {
  const propertyId = useSelector(myPagePropertyIdSelector);
  const intervalId = useRef(null);
  const [initial, setInitial] = useState(true);
  const [isCurrentJob, setIsCurrentJob] = useState(false);
  const [loading, setLoading] = useState(false);
  const pingCount = useRef(0);
  const [alert, setAlert] = useState<AlertProps | null>(null);
  const [progressNow, setProgressNow] = useState(0);
  const progressColor = useMemo(() => {
    if (progressNow < 20) return '#FE8C6A';
    if (progressNow < 80) return '#3FC7FA';
    return '#85D262';
  }, [progressNow]);

  const stopChecking = useCallback(
    (props: { alertProps: AlertProps; jobId: number }) => {
      setAlert(props.alertProps);
      setLoading(false);
      if (intervalId.current) {
        clearInterval(intervalId.current);
        intervalId.current = null;
      }
      setProgressNow(0);
      reservationKeyApi.deleteJob(props.jobId);
    },
    [],
  );
  const checkProgress = useCallback(
    (jobId) => () => {
      reservationKeyApi
        .progress(jobId)
        .then(
          ({
            status,
            progressNow: progress,
          }: {
            status: JobStatus;
            progressNow: number | null;
          }) => {
            // if (pingCount.current > 10) {
            //     stopChecking({ alertProps: {
            //         severity: 'danger',
            //         title: 'Synchronization timeout',
            //         onClose: () => setAlert(null)
            //     }, jobId})
            // }
            pingCount.current += 1;
            if (status === JobStatus.STATUS_FAILED) {
              stopChecking({
                alertProps: {
                  severity: 'danger',
                  title: 'Synchronization failed',
                  onClose: () => setAlert(null),
                },
                jobId,
              });
            } else if (status === JobStatus.STATUS_FINISHED) {
              setProgressNow(100);
              setTimeout(() => {
                stopChecking({
                  alertProps: {
                    severity: 'success',
                    title: 'Successfully updated',
                    onClose: () => setAlert(null),
                  },
                  jobId,
                });
              }, 500);
            } else {
              setProgressNow(progress);
            }
          },
        );
    },
    [stopChecking],
  );

  const syncRequest = useCallback(() => {
    if (loading) return;
    setLoading(true);
    if (intervalId.current) {
      clearInterval(intervalId.current);
    }
    setProgressNow(0);
    setAlert(null);
    pingCount.current = 0;
    reservationKeyApi
      .sync(propertyId)
      .then((response: { jobStatusId: number }) => {
        intervalId.current = setInterval(
          checkProgress(response.jobStatusId),
          3000,
        );
      })
      .catch(() => {
        setAlert({
          severity: 'danger',
          title: 'Request Failed',
          onClose: () => setAlert(null),
        });
        setLoading(false);
      });
  }, [checkProgress, intervalId, loading, propertyId]);

  useEffect(() => {
    if (initial && !loading) {
      setInitial(false);
      reservationKeyApi
        .currentJob(propertyId)
        .then((response: { jobStatusId: number | null }) => {
          if (response.jobStatusId) {
            intervalId.current = setInterval(
              checkProgress(response.jobStatusId),
              3000,
            );
            setLoading(true);
          }
        })
        .finally(() => {
          setIsCurrentJob(true);
        });
    }
  }, [checkProgress, initial, loading, propertyId]);

  return (
    <div className="bg-white flex flex-col mb-3 shadow-lg border">
      <h3 className="p-6 bg-blue-900 text-white">
        Import from Reservation Key
      </h3>
      <div className="p-6">
        {alert && <Alert {...alert} />}
        {loading && (
          <div className="flex justify-center mb-4" style={{ height: 200 }}>
            <CircularProgressbar
              value={progressNow}
              text={`${progressNow}%`}
              styles={buildStyles({
                pathColor: progressColor,
                textColor: progressColor,
              })}
            />
          </div>
        )}
        {isCurrentJob && !loading && (
          <p className="mb-4">Update calendars from Reservation Key</p>
        )}
        {isCurrentJob && (
          <button
            type="button"
            className="btn btn-primary"
            disabled={loading}
            onClick={syncRequest}
          >
            Update
          </button>
        )}
      </div>
    </div>
  );
};
export default UpdateCalendar;
