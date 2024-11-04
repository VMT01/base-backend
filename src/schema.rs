// @generated automatically by Diesel CLI.

diesel::table! {
    users (id) {
        id -> Int4,
        created_at -> Timestamp,
        updated_at -> Timestamp,
        name -> Varchar,
    }
}
