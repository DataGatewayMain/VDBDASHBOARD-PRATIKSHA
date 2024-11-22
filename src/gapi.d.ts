declare namespace gapi {
    namespace client {
      namespace analyticsdata {
        interface RunReportRequest {
          property: string;
          dateRanges: { startDate: string; endDate: string }[];
          metrics: { name: string }[];
          dimensions: { name: string }[];
        }
        
        interface RunReportResponse {
          // Define the structure of the response as needed
          rows?: Array<{ dimensionValues: Array<{ value: string }>; metricValues: Array<{ value: string }> }>;
        }
  
        function properties(): {
          runReport(request: RunReportRequest): Promise<{ result: RunReportResponse }>;
        };
      }
    }
  }
  