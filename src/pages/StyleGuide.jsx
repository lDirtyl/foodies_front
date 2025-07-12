import { Button } from '../components/Button/Button';
import { ButtonIcon } from '../components/ButtonIcon/ButtonIcon';
import { ButtonOutline } from '../components/ButtonOutline/ButtonOutline';
import { Checkbox } from '../components/Checkbox/Checkbox';
import { Dropdown } from '../components/Dropdown/Dropdown';
import { Input } from '../components/Input/Input';

export default function StyleGuide() {
  return (
    <div style={{ padding: '2rem', backgroundColor: '#fff', color: '#000' }}>
      <h1>UI base KIT</h1>

      <section>
        <h2>Base Components</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Button>Click me</Button>
          <ButtonIcon icon={<img src="/icons/trash.svg" alt="icon" />} />
          <ButtonOutline>ADD RECIPE</ButtonOutline>
          <Checkbox />
          <Dropdown options={[{ label: 'Option 1', value: '1' }]} />
          <Input placeholder="Type here..." />
        </div>
      </section>
    </div>
  );
}
