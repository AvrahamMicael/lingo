export interface Link {
    name: string,
    href: string,
};

export interface Lesson {
    title: string,
    body: string,
    id?: number,
    created_at?: string,
    updated_at?: string,
};
