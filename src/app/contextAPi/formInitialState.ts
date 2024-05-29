// Define the initial state for email form
export interface EmailInput {
  account_name: string;
  email: string;
  smtp_server_address: string;
  smtp_server_port: string;
  smtp_server_username: string;
  smtp_server_password: string;
  reply_to: string;
}

export const initialEmailInput: EmailInput = {
  account_name: "",
  email: "",
  smtp_server_address: "",
  smtp_server_port: "",
  smtp_server_username: "",
  smtp_server_password: "",
  reply_to: "",
};

// Define the initial state for reply email


export interface ReplyEmailInterface {
  email: string
}

export const replyIntialState: ReplyEmailInterface = {
  email: "",
};

// Define the initial state for another form, e.g., User form

export interface UserInput {
  username: string;
  password: string;
  confirmPassword: string;
}

export const initialUserInput: UserInput = {
  username: "",
  password: "",
  confirmPassword: "",
};

// email variants interface

export interface EmailVariant {
  title: string;
  subject: string;
  content: string;
}

export interface EmailVariantsInterface {
  emailVariant: EmailVariant[];
}

export const initialEmailVariant: EmailVariantsInterface = {
  emailVariant: [
    {
      title: "",
      subject: "",
      content: "",
    },
  ],
};

// end email variants

// start writing Follow Up email initial state

export interface FollowUpEmail {
  title: string;
  subject: string;
  content: string;
  wait_for: number;
  is_active: boolean
}

export interface folloWUpEmailInterface {
  followUpEmails: FollowUpEmail[];
}

export const initialFollowUpEmailState: folloWUpEmailInterface = {
    followUpEmails: [],
};

// end writing Follow Up email initial state

// start Define the initial state for connected email form

interface FileInterface {
  name: string;
  lastModified: number;
  webkitRelativePath: string;
  size: number;
  type: string;
}

export interface ConnectedAccountCSVState {
  file_upload: FileInterface | null;
  name: string;
  description: string;
  file_type: string;
}

export const ConnectedAccountInitialCSVState: ConnectedAccountCSVState = {
  file_upload: null,
  name: "testing name",
  description: "This is the description of bulk upload",
  file_type: "CONNECTED_ACCOUNT",
};


// start define the intital state for connected account, audience csv

export interface CSVINTERFACE {
  csvData: any[];
}

export const ConntectedCSVDataIntialState: CSVINTERFACE = {
  csvData: [],
};

export const AudienceCSVDataIntialState: CSVINTERFACE = {
  csvData: [],
};

// end defining the intital state for connected account, audience csv

// start Define the initial state for Audience Form

export interface AudienceFormInterface {
  primary_email: string;
  name: string;
  first_name: string;
  last_name: string;
  title: string;
  phonenumber: string;
  linkedin_profile: string;
  twitterhandle: string;
  lead_display_name: string;
  lead_url: string;
  lead_custom_company_industry: string;
  lead_custom_company_country: string;
}

export const initialAudienceFormState: AudienceFormInterface = {
  primary_email: "",
  name: "",
  first_name: "",
  last_name: "",
  title: "",
  phonenumber: "",
  linkedin_profile: "",
  twitterhandle: "",
  lead_display_name: "",
  lead_url: "",
  lead_custom_company_industry: "",
  lead_custom_company_country: "",
};



// end the initial state for connected account file form

// Combine all initial states
export interface AppState {
  emailForm: EmailInput;
  replyEmail: ReplyEmailInterface;
  userForm: UserInput;
  ConnectedAccountFileForm: ConnectedAccountCSVState;
  EmailVariantForm: EmailVariantsInterface;
  FollowUpEmailForm: folloWUpEmailInterface;
  AudienceForm: AudienceFormInterface;
  connectedAccountDataCSV: CSVINTERFACE,
  audienceDataCSV: CSVINTERFACE,
}

export const initialAppState: AppState = {
  emailForm: initialEmailInput,
  replyEmail: replyIntialState,
  userForm: initialUserInput,
  ConnectedAccountFileForm: ConnectedAccountInitialCSVState,
  EmailVariantForm: initialEmailVariant,
  FollowUpEmailForm:initialFollowUpEmailState,
  AudienceForm: initialAudienceFormState,
  connectedAccountDataCSV: ConntectedCSVDataIntialState,
  audienceDataCSV: AudienceCSVDataIntialState
};
