import {
  EmailInput,
  UserInput,
  ConnectedAccountCSVState,
  EmailVariantsInterface,
  folloWUpEmailInterface,
  AudienceFormInterface,
  initialAppState,
  CSVINTERFACE,
  AppState,
  EmailVariant,
  FollowUpEmail,
  ReplyEmailInterface,
} from "./formInitialState";

// Define action types
export type FormAction =
  | { type: "SET_EMAIL_FORM"; payload: Partial<EmailInput> }
  | { type: "SET_REPLY_EMAIL"; payload: Partial<ReplyEmailInterface> }
  | { type: "SET_AUDIENCE_FORM"; payload: Partial<UserInput> }

  | {
      type: "CONNECTED_ACCOUNT_FILE";
      payload: Partial<ConnectedAccountCSVState>;
    }
  | { type: "EMAIL_VARIANT"; payload: EmailVariant[] }
  | { type: "ADD_EMAIL_VARIANT"; payload: Partial<EmailVariantsInterface> }
  | { type: "FOLLOW_UP_EMAIL"; payload: FollowUpEmail[] }
  | { type: "ADD_FOLLOW_UP_EMAIL"; payload: Partial<folloWUpEmailInterface> }
  | { type: "CONNECTED_ACCOUNT_DATA"; payload: CSVINTERFACE[] }
  | { type: "AUDIENCE_DATA"; payload: CSVINTERFACE[] };

export const formReducer = (state: AppState, action: FormAction): AppState => {
  switch (action.type) {
    case "SET_EMAIL_FORM":
      return {
        ...state,
        emailForm: { ...state.emailForm, ...action.payload },
      };
    case 'SET_REPLY_EMAIL':
      return {
        ...state,
        replyEmail: { ...state.replyEmail, ...action.payload },
      };
    case "SET_AUDIENCE_FORM":
      return {
        ...state,
        AudienceForm: { ...state.AudienceForm, ...action.payload },
      };

    case "CONNECTED_ACCOUNT_FILE":
      console.log(action.payload);
      return {
        ...state,
        ConnectedAccountFileForm: {
          ...state.ConnectedAccountFileForm,
          ...action.payload,
        },
      };
    case "EMAIL_VARIANT":
      // console.log(action.payload)
      // const latestArray = [...state.EmailVariantForm.emailVariant]
      // latestArray.indexOf(action.payload.index)
      return {
        ...state,
        EmailVariantForm: { emailVariant: action.payload },
      };
    case "ADD_EMAIL_VARIANT":
      console.log(action.payload);
      return {
        ...state,
        EmailVariantForm: {
          emailVariant: [
            ...state.EmailVariantForm.emailVariant,
            { title: "", subject: "", content: "" },
          ],
        },
      };
    case "FOLLOW_UP_EMAIL":
      return {
        ...state,
        FollowUpEmailForm: { followUpEmails: action.payload },
      };
    case "ADD_FOLLOW_UP_EMAIL":
      console.log(action.payload);
      return {
        ...state,
        FollowUpEmailForm: {
          followUpEmails: [
            ...state.FollowUpEmailForm.followUpEmails,
            {
              title: "",
              subject: "",
              content: "",
              wait_for: 0,
              is_active: true,
            },
          ],
        },
      };

    case 'CONNECTED_ACCOUNT_DATA':
      return {
        ...state,
        connectedAccountDataCSV: { csvData : action.payload },
      };
    case 'AUDIENCE_DATA':
        return {
          ...state,
          audienceDataCSV: { csvData : action.payload },
        };
    default:
      return state;
  }
};
