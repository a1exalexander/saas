const message = {
  data() {
    return {
      isMessage: {
        success: false,
        error: false,
        info: false,
      },
      message: '',
    };
  },
  methods: {
    showMessage(type) {
      if (this.isMessage[type]) {
        this.isMessage[type] = false;
        setTimeout(() => {
          this.isMessage[type] = true;
          setTimeout(() => {
            this.isMessage[type] = false;
          }, 4000);
        }, 15);
      } else {
        this.isMessage[type] = true;
        setTimeout(() => {
          this.isMessage[type] = false;
        }, 4000);
      }
    },
    setMessage(text) {
      return new Promise((resolve, reject) => {
        this.message = text;
        resolve();
      })
    },
    showError: async function(text) {
      await this.setMessage(text);
      this.showMessage('error');
    },
    showSuccess: async function(text) {
      await this.setMessage(text);
      this.showMessage('success');
    },
    showInfo: async function(text) {
      await this.setMessage(text);
      this.showMessage('info');
    },
  },
};

export default message;