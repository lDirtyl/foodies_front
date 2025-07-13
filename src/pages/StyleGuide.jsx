import { Button } from '../components/Button/Button';
import { ButtonIcon } from '../components/ButtonIcon/ButtonIcon';
import { ButtonOutline } from '../components/ButtonOutline/ButtonOutline';
import { Checkbox } from '../components/Checkbox/Checkbox';
import { Dropdown } from '../components/Dropdown/Dropdown';
import { Input } from '../components/Input/Input';
import { useState } from 'react';

export default function StyleGuide() {
  const [checked, setChecked] = useState(false);
  return (
    <div style={{ padding: '2rem', backgroundColor: '#fff', color: '#000' }}>
      <h1>UI base KIT</h1>

      <section>
        <h2>Base Components</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3>Button</h3>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Button variant="dark" size="large">
              Sign In
            </Button>
            <Button variant="light" size="large">
              Sign In
            </Button>
            <Button variant="dark" size="small">
              Publish
            </Button>
            <Button variant="light" size="small">
              Publish
            </Button>
            <Button variant="transparent" size="medium">
              Sign In
            </Button>
            <Button variant="dark" size="medium">
              Sign Up
            </Button>
          </div>
          <h3>ButtonIcon</h3>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <ButtonIcon
              icon={<img src="/icons/heart.svg" alt="icon" />}
              variant="dark"
              size="large"
            />
            <ButtonIcon
              icon={<img src="/icons/heart.svg" alt="icon" />}
              variant="light"
              size="large"
            />
            <ButtonIcon
              icon={<img src="/icons/heart.svg" alt="icon" />}
              variant="light"
              size="small"
            />
          </div>
          <h3>ButtonOutline</h3>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <ButtonOutline variant="outline" size="large">
              ADD RECIPE
            </ButtonOutline>
            <ButtonOutline variant="dark" size="large">
              ADD RECIPE
            </ButtonOutline>
            <ButtonOutline
              variant="outline"
              size="medium"
              icon={
                <img src="/icons/plus.svg" alt="plus" width={22} height={22} />
              }
            >
              Add Ingredient
            </ButtonOutline>
          </div>
          <h3>Checkbox</h3>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Checkbox checked={checked} onChange={() => setChecked(!checked)} />
          </div>
          <h3>Dropdown</h3>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Dropdown
              placeholder="Select a category"
              options={[
                { label: 'Beef', value: 'beef' },
                { label: 'Pork', value: 'pork' },
                { label: 'Seafood', value: 'seafood' },
              ]}
            />
          </div>
          <h3>Input</h3>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Input placeholder="Type here..." />
          </div>
        </div>
      </section>
    </div>
  );
}
