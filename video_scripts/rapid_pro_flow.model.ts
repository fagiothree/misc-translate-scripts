declare namespace RapidProFlowExport {

    export interface Action {
        quick_replies: string[];
        text: string;
        type: string;
        uuid: string;
        groups: Group[];
        body: string;
        headers: Headers;
        method: string;
        result_name: string;
        url: string;
        addresses: string[];
        subject: string;
        attachments: any[];
    }

    export interface Exit {
        destination_uuid: string;
        uuid: string;
    }
    
    export interface Case {
        arguments: string[];
        category_uuid: string;
        type: string;
        uuid: string;
    }
    
    export interface Wait {
        type: string;
    }

    export interface Router {
        cases: Case[];
        categories: Category[];
        default_category_uuid: string;
        operand: string;
        result_name: string;
        type: string;
        wait: Wait;
    }

    export interface Localization {
    }

    export interface Metadata {
        revision: number;
    }

    export interface Group {
        uuid: string;
        name: string;
        query?: any;
    }

    export interface Headers {
        "Content-Type": string;
    }


    export interface Category {
        exit_uuid: string;
        name: string;
        uuid: string;
    }

    export interface Node {
        actions: Action[];
        exits: Exit[];
        uuid: string;
        router: Router;
    }

    export interface Flow {
        name: string;
        uuid: string;
        spec_version: string;
        language: string;
        type: string;
        nodes: Node[];
        _ui: Ui;
        revision: number;
        expire_after_minutes: number;
        metadata: Metadata;
        localization: Localization;
    }


    export interface Position {
        left: number;
        top: number;
    }

    export interface Cases {
    }

    export interface Config {
        cases: Cases;
    }

    export interface UINodeData {
        type: string;
        position: Position;
        config: Config;
    }

    export interface Nodes {
        NODE_UUID_KEY: UINodeData;
    }

    export interface Stickies {
    }

    export interface Ui {
        nodes: { [nodeId: string]: UINodeData };
        stickies: Stickies;
    }

    export interface RootObject {
        version: string;
        site: string;
        flows: Flow[];
        campaigns: any[];
        triggers: any[];
        fields: any[];
        groups: Group[];
    }

}