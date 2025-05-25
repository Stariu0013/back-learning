import {ValidationError} from "../../driver/types/validationError";

export const createErrorMessage = (errors: ValidationError[]): { errorMessages: ValidationError[] } => {
    return {
        errorMessages: errors
    }
}