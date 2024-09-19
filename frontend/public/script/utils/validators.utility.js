const defaultPresenceValidator = {
    presence: {
        allowEmpty: false,
        message: "^This field is required"
    }
};

const defaultStringMaxLength = {
    length: {
        maximum: 191,
        tooLong: '^Too long (maximum length is %{count} characters)'
    }
};

const defaultPasswordMinLength = {
    length: {
        minimum: 15,
        tooShort: '^Too short (minimum length is %{count} characters).'
    }
};

const defaultEmailFieldValidator = {
    email: {
        message: '^Not a valid email'
    }
};

const defaultEqualityValidator = {
    equality: {
        attribute: 'password',
        message: '^Passwords not matching'
    }
}