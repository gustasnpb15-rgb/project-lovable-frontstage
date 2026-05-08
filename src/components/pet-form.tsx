import { useState, ChangeEvent, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { ImagePlus, PawPrint } from "lucide-react";
import type { PetInput } from "@/lib/pets-store";

interface PetFormProps {
  initial?: Partial<PetInput>;
  onSubmit: (data: PetInput) => void;
  submitLabel?: string;
}

const empty: PetInput = {
  name_pet: "",
  race_pet: "",
  age_pet: 0,
  weight_pet: 0,
  color_pet: "",
  owner_pet: "",
  picture_pet: "",
  obs: "",
};

export function PetForm({ initial, onSubmit, submitLabel = "Salvar" }: PetFormProps) {
  const [form, setForm] = useState<PetInput>({ ...empty, ...initial });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const setField = <K extends keyof PetInput>(k: K, v: PetInput[K]) =>
    setForm((p) => ({ ...p, [k]: v }));

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setField("picture_pet", String(reader.result));
    reader.readAsDataURL(file);
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name_pet.trim()) e.name_pet = "Informe o nome do pet";
    if (!form.race_pet.trim()) e.race_pet = "Informe a raça";
    if (!form.owner_pet.trim()) e.owner_pet = "Informe o dono";
    if (form.age_pet < 0) e.age_pet = "Idade inválida";
    if (form.weight_pet < 0) e.weight_pet = "Peso inválido";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-[280px_1fr]">
      {/* Foto */}
      <Card className="shadow-soft">
        <CardContent className="p-4">
          <Label className="text-xs uppercase tracking-wider text-muted-foreground">
            Foto do pet
          </Label>
          <div className="mt-3 aspect-square w-full overflow-hidden rounded-2xl border-2 border-dashed border-border bg-muted/40 flex items-center justify-center">
            {form.picture_pet ? (
              <img
                src={form.picture_pet}
                alt="preview"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <PawPrint className="h-10 w-10" />
                <span className="text-xs">Pré-visualização</span>
              </div>
            )}
          </div>
          <label
            htmlFor="picture_pet"
            className="mt-3 flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-input bg-background px-3 py-2 text-sm hover:bg-accent transition-colors"
          >
            <ImagePlus className="h-4 w-4" />
            Selecionar imagem
          </label>
          <input
            id="picture_pet"
            name="picture_pet"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFile}
          />
        </CardContent>
      </Card>

      {/* Campos */}
      <Card className="shadow-soft">
        <CardContent className="p-6 grid gap-4 sm:grid-cols-2">
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="name_pet">Nome</Label>
            <Input
              id="name_pet"
              name="name_pet"
              value={form.name_pet}
              onChange={(e) => setField("name_pet", e.target.value)}
            />
            {errors.name_pet && <p className="text-xs text-destructive">{errors.name_pet}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="race_pet">Raça</Label>
            <Input
              id="race_pet"
              name="race_pet"
              value={form.race_pet}
              onChange={(e) => setField("race_pet", e.target.value)}
            />
            {errors.race_pet && <p className="text-xs text-destructive">{errors.race_pet}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="color_pet">Cor</Label>
            <Input
              id="color_pet"
              name="color_pet"
              value={form.color_pet}
              onChange={(e) => setField("color_pet", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="age_pet">Idade (anos)</Label>
            <Input
              id="age_pet"
              name="age_pet"
              type="number"
              min={0}
              value={form.age_pet}
              onChange={(e) => setField("age_pet", Number(e.target.value))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="weight_pet">Peso (kg)</Label>
            <Input
              id="weight_pet"
              name="weight_pet"
              type="number"
              min={0}
              step="0.1"
              value={form.weight_pet}
              onChange={(e) => setField("weight_pet", Number(e.target.value))}
            />
          </div>

          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="owner_pet">Dono</Label>
            <Input
              id="owner_pet"
              name="owner_pet"
              value={form.owner_pet}
              onChange={(e) => setField("owner_pet", e.target.value)}
            />
            {errors.owner_pet && <p className="text-xs text-destructive">{errors.owner_pet}</p>}
          </div>

          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="obs">Observações</Label>
            <Textarea
              id="obs"
              name="obs"
              rows={3}
              value={form.obs}
              onChange={(e) => setField("obs", e.target.value)}
            />
          </div>

          <div className="sm:col-span-2 flex justify-end pt-2">
            <Button type="submit" size="lg" className="shadow-soft">
              {submitLabel}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
