
export function getExercisesSelect(exercises) {
  return exercises.map(x => ({ label: x.name, value: x.id }));
    
}

export function getUnistTypes() {
  return ['metros', 'repeticiones'];
}

export function getIntensityTypes() {
  return [{ id: 1, type: 'kgs' }, { id: 2, type: '%' }, { id: 3, type: 'RPE' }, { id: 4, type: 'RPEs' }];
;
}


