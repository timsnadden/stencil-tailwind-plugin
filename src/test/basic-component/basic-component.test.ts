import { transform } from '../../processors/typescript';
import { loadTestComponent } from '../utils';
import { configurePluginOptions, PluginConfigDefaults } from '../../config/pluginConfiguration';

describe('basic-component', () => {
  beforeEach(() => {
    configurePluginOptions(PluginConfigDefaults.DEFAULT);
  });

  it('given basic component with no tailwindcss styles, should output unaltered styles', async () => {
    // Arrange
    const loadedFile = loadTestComponent('basic-component', 'basic-component.tsx');
    // Act
    const result = await transform(loadedFile.text, loadedFile.path);
    // Assert
    expect(result).toMatchSnapshot();
  });

  it('given basic component *with* tailwindcss styles, should output tailwind styles appended', async () => {
    // Arrange
    const loadedFile = loadTestComponent('basic-component', 'basic-component-tailwind.tsx');
    // Act
    const result = await transform(loadedFile.text, loadedFile.path);
    // Assert
    expect(result).toMatchSnapshot();
  });

  it('given basic component *with* tailwindcss styles, should strip comments', async () => {
    // Arrange
    const loadedFile = loadTestComponent('basic-component', 'basic-component-tailwind.tsx');
    configurePluginOptions(Object.assign({}, PluginConfigDefaults.DEFAULT, { stripComments: true }));
    // Act
    const result = await transform(loadedFile.text, loadedFile.path);
    // Assert
    expect(result).toMatchSnapshot();
  });

  it('given basic component *with* tailwindcss styles but minify disabled, should keep css', async () => {
    // Arrange
    const loadedFile = loadTestComponent('basic-component', 'basic-component-tailwind.tsx');
    configurePluginOptions(Object.assign({}, PluginConfigDefaults.DEFAULT, { minify: false }));
    // Act
    const result = await transform(loadedFile.text, loadedFile.path);
    // Assert
    expect(result).toMatchSnapshot();
  });

  it('given basic component *with* tailwindcss styles but minify and strip enabled, should keep css', async () => {
    // Arrange
    const loadedFile = loadTestComponent('basic-component', 'basic-component-tailwind.tsx');
    configurePluginOptions(Object.assign({}, PluginConfigDefaults.DEFAULT, { minify: true, stripComments: true }));
    // Act
    const result = await transform(loadedFile.text, loadedFile.path);
    // Assert
    expect(result).toMatchSnapshot();
  });
});
