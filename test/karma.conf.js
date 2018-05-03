module.exports = config => {
  config.set({
    frameworks: ['jasmine', 'karma-typescript'],
    basePath: '..',
    files: [
      'src/**/*.ts',
      'src/**/*.tsx',
      'test/fixtures/*.ts',
      'test/helpers/*.ts',
      'test/unit/**/*.ts'
    ],
    preprocessors: {
      '**/*.ts': 'karma-typescript',
      '**/*.tsx': 'karma-typescript'
    },
    karmaTypescriptConfig: {
      tsconfig: 'tsconfig.json',
      coverageOptions: {
        threshold: {
          global: {
            statements: 95,
            branches: 95,
            functions: 95,
            lines: 95
          }
        },
        exclude: [/^test\//],
      },
      reports: {
        html: 'coverage',
        'text-summary': ''
      }
    },
    reporters: ['spec', 'karma-typescript'],
    // logLevel: config.LOG_DEBUG,
    browsers: ['ChromeHeadlessNoSandbox'],
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox']
      }
    }
    /*
    browserConsoleLogOptions: {
      level: 'info',
      terminal: false
    }
    */
  })
}
