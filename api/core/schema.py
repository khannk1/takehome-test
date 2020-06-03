from graphene_django import DjangoObjectType
from graphene.types import generic
from .models import Family
import graphene
from jsonfield import JSONField
from graphene_django.converter import convert_django_field

@convert_django_field.register(JSONField)
def convert_json_field_to_string(field, registry=None):
    return generic.GenericScalar()

class FamilyType(DjangoObjectType):
    
    class Meta:
        model = Family

class FamilyQuery(graphene.ObjectType):
    all_families = graphene.List(FamilyType)
    family = graphene.Field(FamilyType, id=graphene.Int())

    def resolve_all_families(self, info, **kwargs):
        return Family.objects.all()

    def resolve_family(self, info, id):
        return Family.objects.get(id=id)

class SampleMutation(graphene.Mutation):
    # This is a sample mutation that takes an ID and data object.
    # Create your own mutations for the test.
    class Arguments:
        data = generic.GenericScalar()
        id = graphene.ID()

    family = graphene.Field(FamilyType)

    def mutate(self, info, data, id):
        family = Family.objects.get(id=id)
        # change family object in DB here
        # More info on DB ORM here - https://docs.djangoproject.com/en/3.0/topics/db/queries/
        # save changes to DB.
        family.save()
        return SampleMutation(family=family)


class Mutation(graphene.ObjectType):
    sample_mutation = ModifyFamilyMutation.Field()


    