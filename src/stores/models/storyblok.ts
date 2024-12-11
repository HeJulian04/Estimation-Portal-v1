import {StoryblokStory} from 'storyblok-generate-ts'

export interface AdditionalServiceStoryblok {
  service: string;
  per_piece?: boolean;
  price: string;
  price_name?: string;
  _uid: string;
  component: "additional_service";
  [k: string]: any;
}

export interface EstimationPortalStoryblok {
  input_fields_second_condition_title: string;
  input_fields: InputFieldStoryblok[];
  slider_options: (
    | AdditionalServiceStoryblok
    | EstimationPortalStoryblok
    | InputFieldStoryblok
    | PageStoryblok
    | SliderOptionStoryblok
  )[];
  additional_services?: AdditionalServiceStoryblok[];
  _uid: string;
  component: "estimation_portal";
  [k: string]: any;
}

export interface InputFieldStoryblok {
  title: string;
  second_condition_title?: string;
  placeholder: string;
  error_message: string;
  second_condition_error_message?: string;
  _uid: string;
  component: "input_field";
  [k: string]: any;
}

export interface PageStoryblok {
  body?: (
    | AdditionalServiceStoryblok
    | EstimationPortalStoryblok
    | InputFieldStoryblok
    | PageStoryblok
    | SliderOptionStoryblok
  )[];
  _uid: string;
  component: "page";
  uuid?: string;
  [k: string]: any;
}

export interface SliderOptionStoryblok {
  title: string;
  error_message: string;
  _uid: string;
  component: "slider_option";
  [k: string]: any;
}
