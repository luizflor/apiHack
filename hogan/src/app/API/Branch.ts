

namespace API.Client {
    'use strict';

    export interface Branch {

        "name"?: string;

        "addressLine1"?: string;

        "addressLine2"?: string;

        "addressLine3"?: string;

        "distance"?: number;

        "distanceUnit"?: string;

        "workingHours"?: Array<WorkingHours>;
    }

}
